---
date: "2015-04-03T12:18:44Z"
title: "jasmine test with configurable angular services"
categories: ["javascript"]
tags: []
excerpt: "This post is just a jasmine braindump :```beforeEach(module('angular-toolkit-auth', function (authP..."
---

This post is just a jasmine braindump :

> **When testing angularjs services that needs to be configured, this is the way to configure it**

```
beforeEach(module('angular-toolkit-auth', function (authProvider, openIdProvider) { authProvider.setAuthenticationType('Bearer'); }));
```

> **if you need more than one module to be instantiated for your test:**

```
beforeEach(function(){ module('angular-toolkit-storage'); module('angular-toolkit-auth'); }); // or you can call them one after the other like so beforeEach(module('angular-toolkit-auth')); beforeEach(module('angular-toolkit-auth-config'));
```