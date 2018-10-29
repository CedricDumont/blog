---
date: "2015-08-15T13:57:13Z"
title: "EntityFramework in memory testing with xml files"
categories: ["c#"]
tags: ["entityframework", "test"]
excerpt: "Lately I wanted to test entity framework using input xml files and expected xml files. So I started..."
---

Lately I wanted to test entity framework using input xml files and expected xml files. So I started an open source project [CExtensions.Effort](https://github.com/CedricDumont/CExtensions-Net) as I could find something that fitted my needs.

so if you would like to have this as your DbContext input :

```

            <Root>
              <AUTHOR>
                <AUT_ID>1</AUT_ID>
                <AUT_FIRSTNAME>John</AUT_FIRSTNAME>
                <AUT_LASTNAME>DOEDOE</AUT_LASTNAME>
                <AUT_EXPERIENCE>12</AUT_EXPERIENCE>
              </AUTHOR>
              <AUTHOR>
                <AUT_ID>2</AUT_ID>
                <AUT_FIRSTNAME>Albert</AUT_FIRSTNAME>
                <AUT_LASTNAME>Einstein</AUT_LASTNAME>
                <AUT_EXPERIENCE>150</AUT_EXPERIENCE>
              </AUTHOR>
            </ROOT>
```

and compare to this expected result to check that the name of Author changed and that Author with id 2 was deleted

```

            <Root>
              <AUTHOR>
                <AUT_ID>1</AUT_ID>
                <AUT_FIRSTNAME>John</AUT_FIRSTNAME>
                <AUT_LASTNAME>Doe</AUT_LASTNAME>
                <AUT_EXPERIENCE>12</AUT_EXPERIENCE>
              </AUTHOR>             
            </ROOT>
```

Then this project might be interesting for you

At the time of writing the code works, but with some limitations and the documentation has to be written. But basically what this project provides is the ability to create a context from XML input files and compare it to XML expected output files. all that without your code hitting your database.(all in memory)

for more information check the project home page : [CExtensions-Net](https://github.com/CedricDumont/CExtensions-Net)

this project is based on some other opensource project like [Effort](https://effort.codeplex.com/) and [CompareNETObjects](https://comparenetobjects.codeplex.com/).