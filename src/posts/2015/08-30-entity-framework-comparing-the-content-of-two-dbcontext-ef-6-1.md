---
date: "2015-08-30T08:30:41Z"
title: "Entity Framework - comparing the content of two DbContext (EF 6.1)"
categories: ["c#"]
tags: ["entityframework"]
excerpt: "Did you ever want to compare the content of two DbContext and getting a list of all differences bet..."
---

Did you ever want to compare the content of two DbContext and getting a list of all differences between both.

for example, you have one context containing :

```

  <Root>
    <AUTHOR>
      <AUT_ID>1</AUT_ID>
      <AUT_FIRSTNAME>Cedric</AUT_FIRSTNAME>
      <AUT_LASTNAME>Dumont</AUT_LASTNAME>
    </AUTHOR>
  </Root>
```

and another containing :

```

  <Root>
    <AUTHOR>
      <AUT_ID>1</AUT_ID>
      <AUT_FIRSTNAME>Cedric123</AUT_FIRSTNAME>
    </AUTHOR>
  </Root>
```

you would like to have a message telling you this:

> _Found at least 2 Differences :_ _1 / Author.FirstName Should be [Cedric] but was [Cedric123] - object with AUT_ID : 1_ _2 / Author.LastName Should be [Dumont] but was [(null)] - object with AUT_ID : 1_

then you would probably check this

> **PM> Install-Package CExtensions.EntityFramework -Pre**

and code this

```

var comparisonResult = await appContext.CompareTo(expectedContext);

var errorMessage = comparisonResult.ToString();

```

check whole project on [github - CExtensions-Net](https://github.com/CedricDumont/CExtensions-Net)