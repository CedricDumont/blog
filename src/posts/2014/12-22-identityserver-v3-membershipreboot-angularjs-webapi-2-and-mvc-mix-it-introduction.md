---
path: "/pages/2014/12/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-introduction/"
date: "2014-12-22T14:28:25Z"
title: "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Introduction"
categories: []
tags: []
excerpt: "_Disclaimer : I am not an angularjs or security expert. What I write here is based on my readings a..."
single: true
---

_Disclaimer : I am not an angularjs or security expert. What I write here is based on my readings and foundings on the net. I also didn't read the full [OpenId connect spec](http://openid.net/specs/openid-connect-core-1_0.html). So feel free to comment the articles and the code and I will try to keep it up to date._

This article talks about different open source project that you can use to build and protect your application. As there are lots of article speaking on angularjs, webapi2 and MVC my main focus point here is how to use the new [Thinktecture's IdentityServer v3](https://github.com/thinktecture/Thinktecture.IdentityServer.v3) to protect your application and allow external application (Client) to call your Api. (remember the "Do you allow XXXX to acces your _email_ and _profile_ _information_ and to have '_write_' access to your data?").

_**full code :**_ [https://github.com/CedricDumont/Mix-It](https://github.com/CedricDumont/Mix-It)

#### Parts

I splitted this article in multiple parts for clarity and will try to keep each part up to date as comments are coming in :

**[Part 1](http://cedric-dumont.com/tutorials/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-introduction/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-part-1/ "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Part 1") : **setting up and configure IdentityServer. IdentityServer will be used to authenticate user but also to authenticate Client and give them access to User's resource after they give them consent.

**[Part 2](http://cedric-dumont.com/tutorials/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-introduction/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-part-2/ "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Part 2") : **create our "private" API that will contain an accountController responsible for creating our users. The responsibility to authenticate them will be provided by IdentityServer.

[**Part 3**](http://cedric-dumont.com/tutorials/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-introduction/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-part-3/ "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Part 3") : creating a public Web API that will "expose" user's Resources. By user resources, I mean Products, Contacts, Orders ...

**[Part 4](http://cedric-dumont.com/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-part-4/ "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Part 4") : **creating our angularjs Web UI which will allow us to Register an account, Log In and Logout, List Resources...

**[Part 5](http://cedric-dumont.com/tutorials/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-introduction/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-part-5/ "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Part 5"): **Creating an MVC application that will access our public Web Api using a token.

#### link to frameworks

IdentityServer : [https://github.com/thinktecture/Thinktecture.IdentityServer.v3](https://github.com/thinktecture/Thinktecture.IdentityServer.v3)

AngularJs : [https://angularjs.org/](https://angularjs.org/)

Web Api : [http://www.asp.net/web-api](http://www.asp.net/web-api)

MVC : [http://www.asp.net/mvc](http://www.asp.net/mvc)

Semantic UI : [http://semantic-ui.com/](http://semantic-ui.com/)
