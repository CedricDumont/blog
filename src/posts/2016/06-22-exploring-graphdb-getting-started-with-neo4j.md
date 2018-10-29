---
date: "2016-06-22T19:11:39Z"
title: "Exploring GraphDb - Getting Started with Neo4J"
categories: ["Learn"]
tags: ["graphdb", "neo4j"]
excerpt: "To get up and running with a graphDb is pretty simple and faster than I thought. I started my learn..."
---

To get up and running with a graphDb is pretty simple and faster than I thought. I started my learning with Neo4J installation on a Windows (running windows 7).

simply by going this way : [neo4j getting started](https://neo4j.com/developer/get-started/) or going directly to the [download link](https://neo4j.com/download/).

1) from there :

* you can choose the free community edition
* then select the [Other Releases link](https://neo4j.com/download/other-releases/)
* I choosed **Neo4j 3.0.3 for windows 64 bit**, but this depend on your platform.

2) I've created a folder structure: `C:\projects\learn\Neo4j`

3) I unzipped the downloaded file and extracted it to `C:\projects\learn\Neo4j\software\neo4j-community-3.0.3`

4) I also downloaded a jdk 1.8 and installed here :

* `C:\projects\learn\Neo4j\software\Java\jdk1.8.0_72`
* `C:\projects\learn\Neo4j\software\Java\jre1.8.0_72`

5) I then created a start-env.bat in `C:\projects\learn\Neo4j` which allows me to simply start neo4j with the **neo** alias.

```text
C:\projects\learn\Neo4j>neo

```

here is the content of the file

```bash
@echo off
set PROJECT_HOME=C:\projects\learn\Neo4j
set JAVA_HOME=%PROJECT_HOME%\software\Java\jdk1.8.0_72
set PROJECT_TEMP=%PROJECT_HOME%\temp
set NEO4J_HOME=%PROJECT_HOME%\software\neo4j-community-3.0.3
rem set the doskey
DOSKEY neo=@echo off $T cd %PROJECT_TEMP% $T start %NEO4J_HOME%\bin\neo4j.bat console $T @echo on
color 18
echo.
echo. LEARN : Neo4J  (%PROJECT_HOME%)
echo.
echo. ________________________________________________________________________
echo.
echo. ENV
echo. ====
echo.
echo. JAVA_HOME  is     :  %JAVA_HOME%
echo. NEO4J_HOME home   :  %NEO4J_HOME%
echo.
echo. COMMANDS
echo. ========
echo. neo  : start neo4j  (neo4j.bat console)
echo.
echo. INFO
echo. ========
echo.
echo. 1\. In a browser, open http://localhost:7474/
echo.
echo. 2\. From any REST client or browser, open http://localhost:7474/db/data
echo.    in order to get a REST starting point, e.g.
echo.    curl -v http://localhost:7474/db/data
echo.
echo. 3\. Shutdown the server by typing Ctrl-C in the console.
echo.
echo.
echo.
echo.  user/pass : neo4j/admin
echo. ________________________________________________________________________  
echo. 

call cmd
```

now, it's time to play

some resources :

* [data-modeling-graph-databases](https://www.infoq.com/articles/data-modeling-graph-databases)
* [GraphConnect event site](http://graphconnect.com/) - [GraphConnect 2016 videos](http://graphconnect.com/gc2016-europe/)
