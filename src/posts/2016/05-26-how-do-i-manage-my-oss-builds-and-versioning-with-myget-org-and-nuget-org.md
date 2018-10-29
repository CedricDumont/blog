---
date: "2016-05-26T14:45:02Z"
title: "How Do I manage my OSS builds and versioning with MyGet.org and Nuget.org"
categories: ["How-to", "tools"]
tags: ["build", "myget", "nuget"]
excerpt: "I write this post, because everytime I start a new project, I wonder what is the correct configurat..."
---

I write this post, because everytime I start a new project, I wonder what is the correct configuration. So I will keep things in sync from here.

### 1\. Build with Myget

_nota : I use Myget for my dev builds and nuget only for beta, rc and prod releases._

* First create a new feed from [www.myget.org](https://www.myget.org/) => simply click on **New Feed** button

[![Create_feed](26-1.jpg)](26-1.jpg)

* Then create a build configuration: (I use Github for OSS, any other is just fine)

[![create_build_config](26-2.jpg?w=474)](26-2.jpg)

* Then edit and configure the build information (the repo url, the branch ...). Should already be filled in, usually, you can keep them

[![edit_build_1](26-3.jpg)](26-3.jpg)

* Now the beautifull part : **Versioning**

[![build_versions](26-4.jpg)](26-4.jpg)

I use this pattern (any advice are welcome) : **`MajorVersion.MinorVersion.Revision-targetRelease-build`**

This leads to :

* 1.0.0-dev-{0}
* 1.0.0-beta1-{0} (when I am confident)
* 1.0.0-beta2-{0} (when I though I was confident... but oh my !!)
* 1.0.0-beta3-{0} (hum... rarely)
* 1.0.0-rc1-{0} (when I feel no interface change will occur and only bug fix and unit test will be added)
* 1.0.0-rc2-{0} (same comment as beta2)
* 1.0.{0} (when in prod)

I also list the package I want to publish explicitly

[![packages](26-5.jpg)](26-5.jpg)

### 2\. Pushing to Nuget.org

when the build succeeds (howdy!) and you want to share to a wide range of dev you can push to nuget, but first you must add your credentials to your package source

[![package-source](26-6.jpg)](26-6.jpg)

Using an API key that you can find in your nuget.org account

[![auth-nuget](26-7.jpg)](26-7.jpg)

then go to Packages and push your latest package upstream.

[![push-to-nuget](26-8.jpg)](26-8.jpg)

### 3\. Things to know

When you go to **Packages** and select your package you have lot's of info on your package. You can also get the symbol url (usefull for debugging) which is https://www.myget.org/F/cextensions-efmodelgenerator/symbols/ by the way.

You also have a feed that you can configure in visual studio

Tools -> Nuget Package Manager -> Package Manager Settings.

[![VS package manager](26-9.jpg)](26-9.jpg)

This url can be obtained on the Feed Details view:

[![feed_details](26-10.jpg)](26-10.jpg)