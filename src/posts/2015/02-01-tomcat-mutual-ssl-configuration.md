---
date: "2015-02-01T16:45:47Z"
title: "Tomcat Mutual ssl configuration"
categories: ["java", "security"]
tags: ["keystore", "ssl", "tomcat"]
excerpt: "Lately I had to configure tomcat for mutual SSL. I ran into some problems and here is what helped m..."
---

Lately I had to configure tomcat for mutual SSL. I ran into some problems and here is what helped me.

In fact, My problem was not having the correct certification path in my keystore. 
I had the following certificate :

```
"SERIALNUMBER=2010,CN=Government CA,C=BE"
```

and the certificate sended by the client was certified by the intermediary :

```
"SERIALNUMBER=2011,CN=Government CA,C=BE".
```

=> the only difference is 2010 => 2011\. The problem was solved after adding the correct certificate to my keystore.

### here are some tips that helped me to identify the problem

* these two posts: [setting-up-two-way-mutual-ssl-with.html](http://blog1.vorburger.ch/2006/08/setting-up-two-way-mutual-ssl-with.html) - [two-way-ssl-on-tomcat](http://java-notes.com/index.php/two-way-ssl-on-tomcat)
* starting tomcat in ssl debug mode by adding "-Djavax.net.debug=ssl" to the start command in my catalina.sh
* knowing the handshake events: ``` 1\. Server Hello 2\. Client Hello 3\. Certificate chain 4\. found trusted certificate 5\. Certificate request 6\. Server Hello done. 7\. Certificate chain 8\. ClientKeyExchange, RSA PreMasterSecret, TLSv1 9\. verify_data ```
* here is the correct ssl configuration in tomcat: ``` <Connector port="8683" protocol="HTTP/1.1" SSLEnabled="true" maxThreads="150" scheme="https" secure="true" clientAuth="true" sslProtocol="TLS" keyAlias="ALIAS OF YOUR CERTIFICATE IN THE keystoreFile" keystoreFile="conf/myKeyStore.jks" keystorePass="myPass" truststoreFile="conf/myKeyStore.jks" truststorePass="myPass"/> ```

### Here is what didn't help me:

* adding a user with roles in my tomcat-users.xml and adding the following to web.xml ``` in tomcat-users.xml: <user username="Full CN of the client certificate" password="null" roles="secureconn"/> in web.xml of my application <security-constraint> <web-resource-collection> <web-resource-name>secureconn</web-resource-name> <url-pattern>/*</url-pattern> </web-resource-collection> <auth-constraint> <role-name>secureconn</role-name> </auth-constraint> </security-constraint> <login-config> <auth-method>CLIENT-CERT</auth-method> <realm-name>WebServicePort</realm-name> </login-config> <security-role> <role-name>secureconn</role-name> </security-role> ```

Hope this will help someone facing the same problem : check all your CN of the certificate in your keystore and check that the chain is complete.
