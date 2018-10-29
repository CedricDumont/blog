---
date: "2017-02-01T06:32:25Z"
title: "install apache benchmarking tool (ab) on windows"
categories: ["tools"]
tags: []
excerpt: "```textab -n 100 -c 10 http://yourserver/yourapi```or```textab -p content.json -T application/json ..."
---

1. download apache binaries from an apache recommended download site (i.e. :[apache lounge](https://www.apachelounge.com/download/))
2. extract the content using zip tool
3. copy the /bin/ab.exe to a folder of your choice (i.e.: c:\temp)
4. start a command prompt and run it

```text
ab -n 100 -c 10 http://yourserver/yourapi
```

or

```text
# content.json contains the json you want to post
# -p means to POST it
# -H adds an Auth header (could be Basic or Token)
# -T sets the Content-Type
# -c is concurrent clients
# -n is the number of requests to run in the test
# -l Accept variable document length (use this for dynamic pages)

ab -p content.json -T application/json -H 'Authorization: Bearer xxxx' -c 10 -n 2000 -l http://myserver/myapi
```