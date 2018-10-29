---
date: "2016-06-27T20:26:20Z"
title: "PostgreSQL - new jsonb feature exploration - insert, query, index"
categories: ["c#", "datastore"]
tags: ["nosql", "postgreSQL"]
excerpt: "In this post, I will explore the (not really new) postgreSQL jsonb feature as my objective is to co..."
---

In this post, I will explore the (not really new) postgreSQL jsonb feature as my objective is to compare nosql performance in real scenarii.

##### Prerequisite:

* postgreSQL 9.4.4 installed (you can check by issuing the following : `select version();`)
* pgAdmin installed
* this runs on a HP probook 6560b
    * Processor Intel(R) Core(TM) i5-2520M CPU @ 2.50GHz, 2501 Mhz, 2 Core(s), 4 Logical Processor(s)
    * 16 G of ram

##### Roadmap

* create the database.
* import some data (1M of contact records)
* query without index
* add a gin index
* query after index
* create specific index on field
* query on indexed fields

### 1\. Create the database

Connect to your postgres installation with pgAdmin and issue the following to create the table. I've create a schema, but you're not required to.

```sql
CREATE SCHEMA business
  AUTHORIZATION postgres;

CREATE TABLE business."Contact"
(
  "ID" bigint NOT NULL,
  first_name character varying(100),
  last_name character varying(100),
  extended json,
  niss character varying(11),
  CONSTRAINT "Contact_pkey" PRIMARY KEY ("ID")
)
WITH (
  OIDS=FALSE
);
ALTER TABLE business."Contact"
  OWNER TO postgres;
```

This simply creates a table Contact with ID as primary key, some columns and a field extended of type [jsonb](https://www.postgresql.org/docs/9.4/static/datatype-json.html). No index for now.

#### 2\. Import data

This might be improved, but as I had some code to import my files in the DB, I just used it.

Just create a Console project in visual studio 2015.

install nuget packages :  `CsvHelper, Newtonsoft.Json and Npgsql`

I've used these:

```xml
<packages>
  <package id="CsvHelper" version="2.15.0.0" targetFramework="net45" />
  <package id="Newtonsoft.Json" version="9.0.1-beta1" targetFramework="net45" />
  <package id="Npgsql" version="3.1.4" targetFramework="net45" />
</packages>
```

copy paste the code below and run the project. 
(It took about 50 minutes and I am sure there are better ways to import these data)

[code lang=csharp]
namespace PGImport
{
    class Program
    {
        static void Main(string[] args)
        {
            Stopwatch watch = new Stopwatch();
            watch.Start();
            ImportContact(@"C:\projects\learn\Neo4j\sandbox\sample-data\contact-list-1.csv");
            ImportContact(@"C:\projects\learn\Neo4j\sandbox\sample-data\contact-list-2.csv");
            ImportContact(@"C:\projects\learn\Neo4j\sandbox\sample-data\contact-list-3.csv");
            ImportContact(@"C:\projects\learn\Neo4j\sandbox\sample-data\contact-list-4.csv");
            ImportContact(@"C:\projects\learn\Neo4j\sandbox\sample-data\contact-list-5.csv");
            ImportContact(@"C:\projects\learn\Neo4j\sandbox\sample-data\contact-list-6.csv");
            ImportContact(@"C:\projects\learn\Neo4j\sandbox\sample-data\contact-list-7.csv");
            ImportContact(@"C:\projects\learn\Neo4j\sandbox\sample-data\contact-list-8.csv");
            ImportContact(@"C:\projects\learn\Neo4j\sandbox\sample-data\contact-list-9.csv");
            ImportContact(@"C:\projects\learn\Neo4j\sandbox\sample-data\contact-list-10.csv");
            watch.Stop();
            Console.WriteLine(watch.ElapsedMilliseconds / 1000 + "sec");
            Console.ReadLine();
        }

        public static void ImportContact(string filePath)
        {
            using (var reader = File.OpenText(filePath))
            {
                NpgsqlConnection conn = new 
                    NpgsqlConnection
                   ("Server=127.0.0.1;Port=5432;UserId=postgres;Password=SECRET;Database=yourdb");

                try
                {
                    conn.Open();
                    var csv = new CsvReader(reader);
                    while (csv.Read())
                    {
                        var seq = csv.GetField<int>("seq");
                        var first = csv.GetField<string>("first");
                        var last = csv.GetField<string>("last");
                        var age = csv.GetField<int>("age");
                        var street = csv.GetField<string>("street");
                        var city = csv.GetField<string>("city");
                        var state = csv.GetField<string>("state");
                        var zip = csv.GetField<string>("zip");
                        var birthday = csv.GetField<string>("birthday");
                        var domain = csv.GetField<string>("pick");
                        var gender = csv.GetField<string>("gender");
                        var phone = csv.GetField<string>("phone");
                        var niss1 = new Random().Next(500101, 999999);
                        var niss2 = new Random().Next(11111, 99999);
                        string niss = niss1.ToString() + niss2.ToString();

                        var streetNumber = 1;
                        IFormatProvider culture = new System.Globalization.CultureInfo("fr-FR", true);
                        var birthdayeAsdate = Convert.ToDateTime(birthday, culture);
                        var email = $"{first}.{last}@{domain}";

                        Contact c = new Contact()
                        {
                            Street = street,
                            StreetNumber = streetNumber,
                            City = city,
                            State = state,
                            Zip = zip,
                            Age = age,
                            BirthDay = birthdayeAsdate,
                            Gender = gender,
                            Phone = phone,
                            Email = email
                        };

                        var serialized = Ser(c);
                        var query = $"insert into business.\"Contact\"( \"ID\", first_name, last_name, niss, extended) values({seq}, '{first}', '{last}', '{niss}','{serialized}' )";

                        NpgsqlCommand cmd = new NpgsqlCommand(query, conn);
                        cmd.ExecuteNonQuery();
                    }
                }
                finally
                {
                    conn?.Close();
                }
            }
        }

        public static string Ser(object obj)
        {
            using (var stringWriter = new StringWriter())
            {
                using (var writer = new JsonTextWriter(stringWriter)
                {
                    //add some options if needed
                })
                {
                    new JsonSerializer { NullValueHandling = NullValueHandling.Ignore }.Serialize(writer, obj);
                }
                var res = stringWriter.ToString();

                return res;
            }
        }

    }

    public class Contact
    {
        public Int32? Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public Int32? Age { get; set; }
        public String Street { get; set; }
        public String City { get; set; }
        public String State { get; set; }
        public String Zip { get; set; }
        public Int32? StreetNumber { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }
        public DateTime? BirthDay { get; set; }
        public String Gender { get; set; }
    }
}
[/code]

#### 3\. Query without and with index

The listing below collects the queries I used to perform my tests and comparison. 
You can copy/paste the listing below to execute the queries on your own machine one by one.
_At the end of the file, you can find the statement used to create the indexes_.

I issued the queries in the following order:

* with column of type json
* after converting to jsonb
* with gin index
* with index on specific fields

```sql
-----------------
-- simple select
----------------
SELECT "ID", extended->>'Zip' as zip FROM business."Contact" limit 100;
--field type json (no index):13ms
--field type jsonb 
--no index : 12ms
--with gin index : 12ms
--with indexes on email and zip : 12ms

-----------------
-- select with cast to int and greater then
----------------
SELECT "ID", extended->>'Zip' as zip, extended->>'Email' as email  FROM business."Contact"
WHERE CAST(extended->>'Zip' AS integer) > 2000
Order by zip desc
limit 100
--field type json (no index) : 9267ms
--field type jsonb 
--no index : 1731ms
--with gin index : 1837ms
--with indexes on email and zip : 13ms

-----------------
-- select with cast to int and greater then
----------------
SELECT "ID", extended->>'Zip' as zip, extended->>'Email' as email  FROM business."Contact"
WHERE (extended->>'Zip')::int > 2000
Order by zip desc
limit 100
--field type json (no index):9278
--field type jsonb 
--no index : 1634ms
--with gin index : 1822ms
--with indexes on email and zip : 14ms

-----------------
-- select containment
----------------
SELECT "ID", extended->>'Zip' as zip, extended->>'Email' as email  FROM business."Contact"
WHERE extended @> '{"Email": "Harriett.Thornton@twitter.com"}'
--field type json (no index) : does not support containment -> @>
--field type jsonb 
--no index : 623ms
--with gin index : 12ms
--with indexes on email and zip : 13ms

-----------------
-- select with like
----------------
SELECT "ID", extended->>'Zip' as zip, extended->>'Email' as email  FROM business."Contact"
WHERE extended->>'Email' Like '%W%' AND (extended->>'Zip')::int > 2000
order by email desc limit 100
--field type json (no index):4130ms
--field type jsonb 
--no index 1014ms
--with gin index : 1073ms
--with indexes on email and zip : 13ms

-----------------
--Index creation
-----------------
-- change to jsonb
ALTER TABLE business."Contact"
  ALTER COLUMN extended
  SET DATA TYPE jsonb
  USING extended::jsonb;
-- Gin 
CREATE INDEX extended_data_gin ON business."Contact" USING GIN (extended);
-- index on field zip
CREATE INDEX ON business."Contact" ((extended->>'Zip'));
-- index on field email
CREATE INDEX ON business."Contact" ((extended->>'Email'));
```

#### 4\. Conclusions so far

* even without index, I found that the elapsed time was reasonable.
* converting from json to jsonb greatly enhanced the performance.
* after creating the GIN index, only the query with '@>' (containment) was faster, the other stayed the same.
* after creating index on fields... well... it was very fast for all queries

**TODO Next:**
- usage of more complex queries (SUM, AVG, Distinct...)
- why were the queries not faster after creating the GIN index.