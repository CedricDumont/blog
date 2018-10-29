---
date: "2015-04-13T20:40:47Z"
title: "Proper Tomcat Resource configuration for MySql"
categories: ["java"]
tags: ["tomcat"]
excerpt: "Lately, I was faced with a mysql error when configured as a Resource in the tomcat server.xml confi..."
---

Lately, I was faced with a mysql error when configured as a Resource in the tomcat server.xml configuration file.

The error looked the following:

```

STACKTRACE:

com.mysql.jdbc.CommunicationsException: Communications link failure due to underlying exception: 

** BEGIN NESTED EXCEPTION ** 

java.net.SocketException
MESSAGE: Broken pipe

STACKTRACE:

java.net.SocketException: Broken pipe
	at java.net.SocketOutputStream.socketWrite0(Native Method)
	at java.net.SocketOutputStream.socketWrite(SocketOutputStream.java:92)
```

The problem was that I was not using the **validationQuery** parameter to be sure that the connection is still alive. So the parameter I neede absolutely were :

```
validationQuery="select current_date()" removeAbandoned="true" removeAbandonedTimeout="300" logAbandoned="false" initialSize="3"
```

Here is part of the server.xml file

```

     <Engine name="Catalina8680" defaultHost="localhost8680">
          <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
                 resourceName="UserDatabase"/>
          <Host name="localhost8680"  appBase="webapps8680"
            unpackWARs="true" autoDeploy="true"
            xmlValidation="false" xmlNamespaceAware="false">
                <Context reloadable="true" displayName="myapp" docBase="/opt/apache-tomcat-6.0.20/webapps8680/myapp" path="/myapp" workDir="work/Catalina8680/localhost8680/myapp">

                <Resource name="jdbc/myapp_ds_0409085721" auth="Container" type="javax.sql.DataSource"
                   maxActive="10" maxIdle="3" maxWait="10000"
                   username="myapp_db" password="myapp_prod" driverClassName="org.gjt.mm.mysql.Driver"
                   url="jdbc:mysql://localhost:3306/myapp" 
                   validationQuery="select current_date()" removeAbandoned="true" removeAbandonedTimeout="300" logAbandoned="false"
                   initialSize="3"/>

...

```