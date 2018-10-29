---
date: "2016-05-25T20:20:19Z"
title: "Generate Poco classes from SqlServer or Oracle using CExtensions.EFModelGenerator"
categories: ["c#", "Development Tools", "How-to", "tools"]
tags: ["tool"]
excerpt: "This post is about a new library CExtensions-EFModelGenerator for generating poco and dbcontext cla..."
---

This post is about a new library [CExtensions-EFModelGenerator](https://github.com/CedricDumont/CExtensions-EFModelGenerator) for generating poco and dbcontext classes from _Oracle or Sqlserver_ databases. 
(support for other databases can be provided through customization).

with this library it could also be possible to generate code for java, javascript and other by implementing a custom Serializer (check the Test for mor info and more samples).

This post guides you through **how to generate code from Sqlserver**. (also check the Sample folder in the repo)

1. Create a new console project

2. Add a config file (ending with .json) : _Models.json_ (replace `ConnectionString`with yours

[code lang=javascript]
{
  "Options": {
    "ElementToGenerate": "All",
    "SchemaName": "dbo",
    "ConnectionString": "Server=MC0QKBSC\\SQLEXPRESS;Database=YOURDB;Trusted_Connection=True;",
    "Namespace": "My.Own.Namespace",
    "IgnoreTableRegex": [ "^backup" ],
    "ColumnNameFormatters": [
      { "Name": "CExtensions.EFModelGenerator.Formatters.IDColumnFormatter"},
      { "Name": "CExtensions.EFModelGenerator.Formatters.SafeIdColumnNameFormatter" },
      {
        "Name": "CExtensions.EFModelGenerator.Formatters.RemoveTillFirstUnderscoreNameFormatter",
        "Params": [ [ "Col_tag", "Tbl_tag" ] ]
      },
      { "Name": "CExtensions.EFModelGenerator.Formatters.UpperFirstLetterNameFormatter" }
    ]

  }

}
[/code]

1. replace Program.Main, to look like the following:

[code lang=csharp]
class Program
{
    static void Main(string[] args)
    {
        string pathToYourJson = @"C:\projects\cextensions\CExtensions-EFModelGenerator\src\Sample\SimpleSample\Models.json"

        Generator.Generate(pathToYourJson);
    }
}
[/code]

1. the generated code will be generated in the same folder as your **Models.json** file and will be called **Models.cs**

you can add this file to your project and add the required packages to get it compiled (EF and System.ComponentModel.DataAnnotations.dll should be in the reference) check the [Test](https://github.com/CedricDumont/CExtensions-EFModelGenerator/tree/master/src/Test) folder to see what you can generate and how **That's it !** note : - A visual studio extension is under development. - Check [GenerationOptions](https://github.com/CedricDumont/CExtensions-EFModelGenerator/blob/master/src/CExtensions.EFModelGenerator/GeneratorOptions.cs) for more info on all Generation option you can provide