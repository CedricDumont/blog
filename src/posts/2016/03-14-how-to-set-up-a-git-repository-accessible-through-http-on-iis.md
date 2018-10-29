---
date: "2016-03-14T15:05:47Z"
title: "How to set up a git repository accessible through http on IIS"
categories: ["Uncategorized"]
tags: []
excerpt: "This post explain how to set up a shared git repository accessible through http using the Bonobo se..."
---

This post explain how to set up a shared git repository accessible through http using the [Bonobo server](https://bonobogitserver.com/) (code available on [github](https://github.com/jakubgarfield/Bonobo-Git-Server))

* * *

the best way to test it, is just by cloning the code on your local machine

```text
git clone https://github.com/jakubgarfield/Bonobo-Git-Server

```

**or**

* download the latest release and unzip it in your Project folder.
* Open it with Visual studio and Build it (Restore nuget packages might help)
* Set Bonobo-Git-Server project as startup project and hit F5.

* * *

after this, you can use BonoboServer

###### you can log in using user : admin, password : admin.

[![bonobo_login-bonobo](14-1.jpg?w=474)](14-1.jpg)

###### Click The Users Menu

[![bonobo_menu_user](14-2.jpg?w=474)](14-2.jpg)

###### Here you can create Users that will be able to connect or work on your repositories

[![bonobo_create_new_user](14-3.jpg?w=474)](14-3.jpg)

###### Click The Repositories Menu and create your repository, add the administrators or/and contributors

[![bonobo_create_new_repo](14-4.jpg?w=474)](14-4.jpg)

###### Use your repo like a normal git repo.

```text
git clone http://localhost:6730/my-new-repo.git

```

Or if you already have a local repo

```text
git remote add my-new-repo_name http://localhost:6730/my-new-repo.git

then

git push my-new-repo_name master

```

###### Install on IIS.

simply copy the Bonobo-Git-Server (or download a release from Bonobo site) in _C:\inetpub\wwwroot_ and you are ready to go with **http://My-Server-Name/Bonobo.Git.Server**

(of course you can configure it like you would for any web application, I use wwroot for simplicity)

* * *

###### Note

I encountered the following error:

```text
Could not load type ‘System.ServiceModel.Activation.HttpModule’ from assembly ‘System.ServiceModel, 
Version=3.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089′.
```

and solved it by changing in **C:\Windows\System32\inetsrv\config\applicationHost.config** the following line :

```text
<br /><add name="ServiceModel" type="System.ServiceModel.Activation.HttpModule, System.ServiceModel, Version=3.0.0.0,
 Culture=neutral, PublicKeyToken=b77a5c561934e089" preCondition="managedHandler,runtimeVersionv2.0" />

To

<add name="ServiceModel" type="System.ServiceModel.Activation.HttpModule, System.ServiceModel, Version=3.0.0.0,
 Culture=neutral, PublicKeyToken=b77a5c561934e089" preCondition="managedHandler" />

```
