---
date: "2016-10-20T20:29:14Z"
title: "If you got git, you got CURL on windows"
categories: ["Uncategorized"]
tags: []
excerpt: "Always looking at having curl on windows. Sure you could simply install it, but if you already have..."
---

Always looking at having curl on windows. 
Sure you could simply install it, but if you already have **git** installed, then you have **curl**.
It's located here (of course depending on where you installed git) : **C:\Program Files\Git\usr\bin** on windows.

So I just create a bat file in C:\Program Files\curl-cmd and create a shortcut on your desktop for example and then use curl to play with some rest apis.

```text
@echo off
set PATH=C:\Program Files\Git\usr\bin;%PATH%
color 17
echo.
echo. ____________________________
echo.
echo.   Play with curl
echo.   curl --help for more info
echo. ____________________________
echo.
echo.
cd c:\Temp
call cmd
```

for example access firebase api:

```text
curl 'https://docs-examples.firebaseio.com/rest/saving-data/fireblog/posts.json?print=pretty'
```