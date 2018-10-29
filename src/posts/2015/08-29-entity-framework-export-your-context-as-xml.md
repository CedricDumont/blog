---
date: "2015-08-29T15:34:51Z"
title: "Entity Framework - export your context as xml"
categories: ["c#"]
tags: ["entityframework"]
excerpt: "Ever wanted to export your context as XML and get a representation of what is contained in it's loc..."
---

Ever wanted to export your context as XML and get a representation of what is contained in it's local view or with all linked properties even if not already loaded in your context.

* create an entity
* add it to the context
* get it's xml representation.

```

Author cedric = new Author() { 
                    FirstName = "Cedric", 
                    LastName = "Dumont" 
                  };
simpleContext.Authors.Add(cedric);

string s = await appContext.AsXmlAsync();

```

* will result in :

```

<Root>
  <AUTHOR>
    <AUT_ID>1</AUT_ID>
    <AUT_FIRSTNAME>Cedric</AUT_FIRSTNAME>
    <AUT_LASTNAME>Dumont</AUT_LASTNAME>
  </AUTHOR>
</Root>
```

* to do this, you will need this

> **PM> Install-Package CExtensions.EntityFramework -Pre**

* also check [CExtensions-Net](https://github.com/CedricDumont/CExtensions-Net) (still pre)