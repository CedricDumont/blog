---
date: "2015-08-29T19:59:11Z"
title: "Entity Framework - Get the mapping between Table, Entity, Properties and Columns at runtime (EF 6.1)"
categories: ["c#"]
tags: ["entityframework"]
excerpt: "Recently, I wanted to dump the content of a DbContext. Therefor, I needed to know some information ..."
---

Recently, I wanted to dump the content of a DbContext. Therefor, I needed to know some information on how Entity and properties were mapping to Tables and columns. (I wanted the output to contain table and column names from my DB schema)
If you are in the same situation, just check the following project : [CExtensions-Net](https://github.com/CedricDumont/CExtensions-Net).

Get the package from nuget :(from version 1.1.0 in pre at the time of writing)

```

  Install-Package CExtensions.EntityFramework -Pre
```

With this in place, getting the mapping for an entity is as simple as:

```

  var entityMapping = someDbContext.GetMappings<Author>();

  entityMapping.Table.ShouldBe("AUTHOR");
  entityMapping.MappedColumn("FirstName").ShouldBe("AUT_FIRSTNAME");

```

If you want to know the mapping for some Table, just do this:

```

  entityMapping = someDbContext.GetMappings("AUTHOR");

  entityMapping.Entity.ShouldBe("Author");
  entityMapping.ClrType.ShouldBe(typeof(Author));

```