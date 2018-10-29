---
date: "2014-12-13T20:00:30Z"
title: "Using ontologies and json-ld to describe a Product"
categories: ["media_types"]
tags: ["jsonld", "ontology", "schema.org"]
excerpt: "If you are new to semantic web, you might find that there are a lot to read and it's sometimes diff..."
---

If you are new to semantic web, you might find that there are a lot to read and it's sometimes difficult to make your path through...
I had some difficulties when I wanted to describe a "Product" as I use to know. in its simple form, a product like it is usually used in ecommerce or in a POS system has these properties :

* **sku** that uniquely identifies the product in the system,
* **EAN** code that could uniquely identify a product among products from other sources
* **name**
* **description**
* **price**
* the **quantity** left to sell

I wanted to write a synchronization system that would take a product from one source provider(an eCommerce)and synchronize it to a POS (Point of sale) System. To do that, I had to map each field from one source to the other.The product SKU in Source-1 could be named UniqueId in source-2.
it is OK to map each field form one source to another, but what if a third source comes into play ? I would have to map each field against source-1 and source-2\. And my mapper wouldn't be reusable.

So I decided to add some description (a layer of abstraction) to each property so that my mapper (piece of software) could understand an entity based on these descriptions. And after goggling on the web I came across the [semantic web](http://www.w3.org/2013/data/). I already heard about it, but didn't find it interesting in my day to day work.

Here is a definition of ontology that helped me in understanding the concept : "For the purposes of this guide an **ontology** is a formal explicit description of concepts in a domain of discourse (**classes**(sometimes called **concepts**)), properties of each concept describing various features and attributes of the concept (**slots**(sometimes called**roles**or**properties**)), and restrictions on slots (**facets**(sometimes called **role restrictions**)). An ontology together with a set of individual **instances** of classes constitutes a **knowledge base"**[ [1]](#[1])

So an ontology is made of :

* Classes
* Properties
* role restrictions

(not far from object oriented programming...)

To describe my particular case, I can use existing Ontologies, like [schema.org](http://schema.org/) or [Goodrelations](http://www.heppnetz.de/projects/goodrelations/).

I decided to use [json-ld](http://json-ld.org/) format for the repesentation. Here is a simple json-ld document representing a **product**

```

{
  "@context":
  {
    "schemaorg": "http://www.schema.org/",
    "Product" : "schemaorg:SomeProducts",
    "name":"schemaorg:name",
    "description":"schemaorg:description",
    "quantity":"schemaorg:InventoryLevel",
    "ean":"schemaorg:gtin13",
    "price":"schemaorg:price",
    "priceCurrency":"schemaorg:priceCurrency"
  },
  "@id":"http://www.example.com/products/1",
  "@type":"Product",
  "name":"myProductName",
  "description":"my description",
  "quantity":{
    "value":"10"
  },
  "ean": "1234567890123",
  "priceCurrency":"EUR"
}
```

On line 15 to 21, I have the description of my product and whatever the naming of my properties (here : _name, description,quantity, ean, priceCurrency_) My mapper will know that **_quantity_** is in fact of type **[InventoryLevel](https://schema.org/inventoryLevel)**and has a _value_ property that gives us the quantity left in stock. So if another party comes into play, I only have to map it's entities properties to the ontology that my system knows about.

* * *

[1] [http://protege.stanford.edu/publications/ontology_development/ontology101-noy-mcguinness.html](http://protege.stanford.edu/publications/ontology_development/ontology101-noy-mcguinness.html)