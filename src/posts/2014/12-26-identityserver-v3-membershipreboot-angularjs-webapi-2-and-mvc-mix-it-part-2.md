---
path: "/pages/2014/12/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-part-2/"
date: "2014-12-26T16:29:03Z"
title: "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Part 2"
categories: []
tags: []
excerpt: "HomeIn this part we will create and configure the web api that will create User accounts in the dat..."
single: true
---

[Home](http://cedric-dumont.com/tutorials/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-introduction/ "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Introduction")

**Introduction **

In this part we will create and configure the web api that will create User accounts in the database. This api will be used by our angularJs based Web UI application to create users. Authentication is left to the Identity server. In fact, we use the facilities of membershipReboot to create User accounts.

[full ongoing code ](https://github.com/CedricDumont/Mix-It)

**Step 1 : Create the project**

In visual studi create an empty web project and select webapi.

[![2.1](26-8-1.jpg)](26-8-1.jpg)

**Step 2 : Add the nuget packages**

For membershipreboot

```

Install-Package BrockAllen.MembershipReboot.WebHost
Install-Package BrockAllen.MembershipReboot.Ef
```

This will also install BrockAllen.MembershipReboot

For Ninject

```

Install-Package ninject.web.common.webhost
```

This will also install ninject.web.common

**Step 3: Create the Models**

In our example, we will add some custom properties to the user account. these will be the First and Last Name. Therefor, we need to create our own custom UserAccount class and we'll add these properties to our Model.
Create a UserAccount class and add properties (These added properties MUST be virtual)

```

    public class UserAccount : RelationalUserAccount
    {
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
    }
```

create the RegisterInputModel class that will be used to transport the data from the UI to the web api.

```

    public class RegisterInputModel
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
```

**Step 4 : configure MR Repository**

in the Web.config file, add the connection string to your membershipReboot DB. In our case it is "MyIdentityDb". If the database is not created, it well be created at runtime.

```

 <connectionStrings>
    <add name="MyIdentityDb" connectionString="Data Source=(LocalDb)\v11.0;Initial Catalog=Identity;Integrated Security=True" providerName="System.Data.SqlClient" />
  </connectionStrings>
```

add the MR DbContext classes

```

namespace MixIt.WebApi.Customization
{

    public class CustomDb : MembershipRebootDbContext<UserAccount>
    {
        public CustomDb()
            : base("MyIdentityDb")
        {
        }
    }

    public class CustomUserAccountRepository : DbContextUserAccountRepository<CustomDb, UserAccount>
    {
        public CustomUserAccountRepository(CustomDb db)
            : base(db)
        {
        }
    }
}
```

also add a class to help init MembershipReboot in Ninject

```

  public class MembershipRebootConfig
    {
        public static MembershipRebootConfiguration<CustomUserAccount> Create()
        {
            var settings = SecuritySettings.Instance;

            var config = new MembershipRebootConfiguration<CustomUserAccount>(settings);

            return config;
        }
    }
```

In Web.config, you must also add a section : membershipreboot if you want to configure it there.

```

<section name="membershipReboot" type="BrockAllen.MembershipReboot.SecuritySettings, BrockAllen.MembershipReboot" />
...
<membershipReboot requireAccountVerification="false"
                    emailIsUsername="false"
                    multiTenant="false"
                    passwordHashingIterationCount="0"
                    accountLockoutDuration="00:01:00"
                    passwordResetFrequency="0" />
```

in NinjectWebCommon#RegisterService() method add the following to DI MemberShipReboot:

```

            var config = MembershipRebootConfig.Create();
            kernel.Bind<UserAccountService<CustomUserAccount>>().ToSelf();
            kernel.Bind<MembershipRebootConfiguration<CustomUserAccount>>().ToConstant(config);
            kernel.Bind<IUserAccountRepository<CustomUserAccount>>().To<CustomUserAccountRepository>().InRequestScope();
            kernel.Bind<CustomDb>().ToSelf().InRequestScope();
```

**Step 5 : make Ninject work**

For Ninject to work, I had to aadd a NinjectDependencyResolver : I followed more or less this article [http://www.peterprovost.org/blog/2012/06/19/adding-ninject-to-web-api/](http://www.peterprovost.org/blog/2012/06/19/adding-ninject-to-web-api/)

So I added a **NinjectDependencyResolver**.cs and **NinjectDependencyScope**.cs and configured them in **ninjectWebCommon ** by adding the following line:

```

GlobalConfiguration.Configuration.DependencyResolver = new NinjectDependencyResolver(kernel);
```

**Step 6 : create the controller**

[code language="csharp"]
 public class RegisterController : ApiController
    {
        UserAccountService<CustomUserAccount> userAccountService;

        public RegisterController(UserAccountService<CustomUserAccount> userAccountService)
        {
            this.userAccountService = userAccountService;
        }

        [HttpPost]
        [Route("api/account/create")]
        public IHttpActionResult RegisterAccount(RegisterInputModel model)
        {
            try
            {
                var account = this.userAccountService.CreateAccount(model.Username, model.Password, model.Email);
            }
            catch (ValidationException vex)
            {
                throw vex;
            }

            return Ok();
        }
    }
[/code]

The controller has one single method for now that registers an account in the repository. We keep things simple here. Here, more checks should be added and better exception handling should be coded. We will improve it later on.

**Step 7 : Test it with fiddler**

Start the project, and using Fiddler, issue the following Post request :

```

Post:
http://localhost:10073/api/account/create

Headers:
User-Agent: Fiddler
Content-Type: application/json

Body:
{
"Username":"somename",
"Password":"passwordMy",
"Email":"test@test2.com"
}
```

Illustration:
[![2.2](26-8-2.jpg)](26-8-2.jpg)

If everything went well, you should receive a "200 OK" response.

You can also start the project we created in [Part 1 (IdentityServer config)](http://cedric-dumont.com/tutorials/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-introduction/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-part-1/ "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Part 1") to check if the account is created.

[![2.3](26-8-3.jpg)](26-8-3.jpg)

## Comments from WordPress

* **[IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! | {&quot;@id&quot;:&quot;cedric-dumont.com&quot;}](http://cedric-dumont.com/2014/12/26/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it/)** 2014-12-27T14:41:12Z
  > [&#8230;] links to parts : part 1 - part 2 - part 3 &#8211; part 4 &#8211; part [&#8230;]
* ![OutOfTouch6947](https://www.gravatar.com/avatar/83a7415c1f95d5a5b750e88bd2ddbf46?d=identicon) **OutOfTouch6947** 2015-07-30T17:53:37Z
  > I do have one question about this part, did you create controller methods to do this to customize the data stored for Identities?  I am just wondering why you didn't just do what Scott did in this post?
  > 
  > 
  > 
  > http://www.hanselman.com/blog/ThinktectureIdentityManagerAsAReplacementForTheASPNETWebSiteAdministrationTool.aspx
* ![josuemb](https://www.gravatar.com/avatar/2fc47e9300e2f09a2acad2ea648ca21a?d=identicon) **[josuemb](http://gravatar.com/josuemb)** 2016-09-20T21:01:11Z
  > There's a little misspelling error in Step 5 : make Ninject work:
  > 
  > 
  > 
  > For Ninject to work, I had to aadd
  > 
  > 
  > 
  > Should be:
  > 
  > For Ninject to work, I had to add
  > 
  > 
  > 
  > I think it was a typo.
  > 
  > 
  > 
  > Regards.
* ![Rui Elói](https://www.gravatar.com/avatar/1ddc6c95a43561bb94c3b7df7ec9660e?d=identicon) **[Rui Elói](https://www.facebook.com/app_scoped_user_id/10207057321892196/)** 2015-05-28T22:30:09Z
  > Hello Cedric, 
  > 
  > 
  > 
  > first of all great tutorial. I've got a few questions:
  > 
  > 
  > 
  > - I'm using this web api (the one that you use to register the account) to also list users and other account management. It's this the right way? The thing is when I add the "Authorization" attribute to my controller and the "app.UseIdentityServerBearerTokenAuthentication" in Startup It always returns me no authorization. I use the same code for the resource Web API and works good.
  > 
  > 
  > 
  > - When I request the token how do I request for more than one scope? 
  > 
  > 
  > 
  > Thank you
* ![OutOfTouch6947](https://www.gravatar.com/avatar/83a7415c1f95d5a5b750e88bd2ddbf46?d=identicon) **OutOfTouch6947** 2015-07-30T19:19:42Z
  > I don't even think I you can just get IdentityManager like Scott did anymore and just run it, for example I don't see where to set AspNetIdentity or MembershipReboot like he did in the new code.
* ![OutOfTouch6947](https://www.gravatar.com/avatar/83a7415c1f95d5a5b750e88bd2ddbf46?d=identicon) **OutOfTouch6947** 2015-07-27T19:01:40Z
  > I am just curious why not combine Step 1 and Step 2 into the same project/codebase?
* ![OutOfTouch6947](https://www.gravatar.com/avatar/83a7415c1f95d5a5b750e88bd2ddbf46?d=identicon) **OutOfTouch6947** 2015-07-27T19:09:17Z
  > Nvm, I see you answered that on another part. Great Posts btw, thanks for sharing.
