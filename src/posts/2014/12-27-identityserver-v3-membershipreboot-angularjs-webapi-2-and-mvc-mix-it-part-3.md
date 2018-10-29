---
path: "/pages/2014/12/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-part-3/"
date: "2014-12-27T10:17:26Z"
title: "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Part 3"
categories: []
tags: []
excerpt: "HomeThis Part will focus on creating a web api that could be called by our AngularJs application (i..."
single: true
---

[Home](http://cedric-dumont.com/tutorials/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-introduction/ "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Introduction")

This Part will focus on creating a web api that could be called by our AngularJs application (in part 4) or by an Other client like an MVC application (we will create it in part 5).

**Step 1 : create an empty web project**

[![3.1](27-2-1.jpg)](27-2-1.jpg)

**Step 2 : add the required Nuget package**

for Owin

```

install-package Microsoft.Owin.Host.SystemWeb
install-package Microsoft.AspNet.WebApi.Owin
install-package Microsoft.AspNet.WebApi.Cors
install-package Thinktecture.IdentityServer.v3.AccessTokenValidation
```

cors are added so ajax call can call this api from different origins and the AccessTokenValidation is used to validate the token we receive with Identityserver v3.

**Step 3 : Create the Controller**

Here, we will create the Resource class that represents the Resources to be "protected" (for whom we need a consent of the owner to get access to...)

[code language="csharp"]
    [RoutePrefix("resource")]
    public class ResourceController : ApiController
    {
       [Route("{id}")]
        public IHttpActionResult Get(long id)
        {
            var res = from element in Resource.GetDummyList()
                      where element.Id == id select element;

            if (res == null)
            {
                return NotFound();
            }

            return Json(res);
        }
    }
[/code]

The controller has a simple Get Method that returns a resource based on its ID.

**Step 4 : Create the Startup.cs class**

here we just init the webapi.

```

    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();

            app.UseWebApi(config);
        }
    }
```

**Step 5 : Test it**

Run the project and go to : http://localhost:14117/resource/2

you should see something like this:

![3.2](27-2-2.jpg)So far ... so good ....

**Step 6 : add Authorize**

Now that our Api is working we will add some protection to it. Remember in[part 1](http://cedric-dumont.com/tutorials/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-introduction/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-part-1/ "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Part 1"), we've added a scope to our **Scopes.cs** class named '_publicApi'. _

This scope wil be required by the caller to be allowed to call this api. so when asking for a token to the Identity server, we need to add the scope _publicapi._

for this we need to add in our Startup.cs that we will use Bearer Token Authentication using our Identity server. We also need to add the authorize attribute to our controller

[code language="csharp"]

-- In Startup.cs

     ...
     app.UseIdentityServerBearerTokenAuthentication(
         new IdentityServerBearerTokenAuthenticationOptions
     {
           Authority = "https://localhost:44305/identity",
           RequiredScopes = new[] { "publicApi" }
     });
     ...

-- In ResourceController.cs

    [RoutePrefix("resource")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [Authorize]
    public class ResourceController : ApiController
    {
    ...
[/code]

N.B. : The url might be different in your case.

**Step 7 : Test with fiddler**

recall in [Part 1](http://cedric-dumont.com/tutorials/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-introduction/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-part-1/ "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Part 1") that we've tested the installation to get a Token, we will use the same to get a Bearer Token and use it to call our public web api. All that with fiddler.
But first let's replay Step 5 and call : [http://localhost:14117/resource/2](http://localhost:14117/resource/2)
if everything is configured well, you should see:

[![3.3](27-2-3.jpg)](27-2-3.jpg)

So, first let's get a token from identity server using fiddler like we did in part 1

Issue the following Post

```

-------------------
Post :

https://localhost:44305/identity/connect/token

Headers:
User-Agent: Fiddler
Content-Type: application/x-www-form-urlencoded
Authorization: Basic SWRlbnRpdHlXZWJVSTpzZWNyZXQ=

Body:
grant_type=password&username=test&password=test&scope=openid publicApi
------------------
```

I got an access token:

```

{"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImRyRklQZDg1ZDB3RldzRzhlcHM3VkllWkRVTSIsImtpZCI6ImRyRklQZDg1ZDB3RldzRzhlcHM3VkllWkRVTSJ9.eyJjbGllbnRfaWQiOiJJZGVudGl0eVdlYlVJIiwic2NvcGUiOlsib3BlbmlkIiwicHVibGljQXBpIl0sInN1YiI6ImVjMmEwMjUwLTY3ZjMtNDQxMS04YTk4LTIyYmE4NjVkMjdjZSIsImFtciI6InBhc3N3b3JkIiwiYXV0aF90aW1lIjoxNDE5Njc0MjQ5LCJpZHAiOiJpZHNydiIsImlzcyI6Imh0dHBzOi8vaWRzcnYzL21peGl0IiwiYXVkIjoiaHR0cHM6Ly9pZHNydjMvbWl4aXQvcmVzb3VyY2VzIiwiZXhwIjoxNDE5Njc3ODQ5LCJuYmYiOjE0MTk2NzQyNDl9.SM0wRw2nfg2KNIwTNM8CT5wCjG5oZl-02Xk6X8aWX9Thy7yBlRJK_ZIFCPzhRPYZJj9G4-iAJ9i3I3Jgu1iqZzLtubsjhOjDL3G9064sOprI86nEyMG_GDNGjL3kO45BmUUAQIqrrojrN8Nv0DR1BArW7Q1ajNg1oSTUe7BkUrbIRsJ-A8oJESs7_O8ScGizt94mDZhGwYqtgZ6zj0J7L-mdIk8nVl1YZ94GFoJddP5Lqud8CQYGYFu5VXMMmUrdFJ1l-ZcZLhoHYS9N0T7XFE2RtPFKUaT_jZNI_xHtwVCJK5ZzTmTSKZMbpjXcCBQyodb9P48pLxWG-CFR3K5OyZ9mfQsaJssF2QQTVwEkdDMRz_k8yajzFiyEr58PC_3qo56pybfUXshs04MH2dKmEYv7FTmno2h2fR_KUuOnuzRYLp1NLg-sY_BEtN4x8fGcH9NEgCo9L7pxZ3_PuEyA-Dm1Q6c2Gst8Om3seiq3KuJ0nlcF0o6OqxPI3halp8BZlDYvUoZeFcB1YOSA4gR4MR4gjZPknBriH-zZKk6JDAptTmI5CeAXxf7VjHBye-R-H663NtjNgm42sbYm77yHFJjci15-3DvZaAJHs90Kbmqdwf1CbXMRrzSIfOctxuamTQSvF4zAbhIhminfeI_gUbjSpkVwZqtUqqdAxcngNeE","expires_in":3600,"token_type":"Bearer"}
```

Now I will use this token to call my public api.

[code]
Request
--------
Get : http://localhost:14117/resource/2

Headers:
User-Agent: Fiddler
Host: localhost:14117
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImRyRklQZDg1ZDB3RldzRzhlcHM3VkllWkRVTSIsImtpZCI6ImRyRklQZDg1ZDB3RldzRzhlcHM3VkllWkRVTSJ9.eyJjbGllbnRfaWQiOiJJZGVudGl0eVdlYlVJIiwic2NvcGUiOlsib3BlbmlkIiwicHVibGljQXBpIl0sInN1YiI6ImVjMmEwMjUwLTY3ZjMtNDQxMS04YTk4LTIyYmE4NjVkMjdjZSIsImFtciI6InBhc3N3b3JkIiwiYXV0aF90aW1lIjoxNDE5Njc0MjQ5LCJpZHAiOiJpZHNydiIsImlzcyI6Imh0dHBzOi8vaWRzcnYzL21peGl0IiwiYXVkIjoiaHR0cHM6Ly9pZHNydjMvbWl4aXQvcmVzb3VyY2VzIiwiZXhwIjoxNDE5Njc3ODQ5LCJuYmYiOjE0MTk2NzQyNDl9.SM0wRw2nfg2KNIwTNM8CT5wCjG5oZl-02Xk6X8aWX9Thy7yBlRJK_ZIFCPzhRPYZJj9G4-iAJ9i3I3Jgu1iqZzLtubsjhOjDL3G9064sOprI86nEyMG_GDNGjL3kO45BmUUAQIqrrojrN8Nv0DR1BArW7Q1ajNg1oSTUe7BkUrbIRsJ-A8oJESs7_O8ScGizt94mDZhGwYqtgZ6zj0J7L-mdIk8nVl1YZ94GFoJddP5Lqud8CQYGYFu5VXMMmUrdFJ1l-ZcZLhoHYS9N0T7XFE2RtPFKUaT_jZNI_xHtwVCJK5ZzTmTSKZMbpjXcCBQyodb9P48pLxWG-CFR3K5OyZ9mfQsaJssF2QQTVwEkdDMRz_k8yajzFiyEr58PC_3qo56pybfUXshs04MH2dKmEYv7FTmno2h2fR_KUuOnuzRYLp1NLg-sY_BEtN4x8fGcH9NEgCo9L7pxZ3_PuEyA-Dm1Q6c2Gst8Om3seiq3KuJ0nlcF0o6OqxPI3halp8BZlDYvUoZeFcB1YOSA4gR4MR4gjZPknBriH-zZKk6JDAptTmI5CeAXxf7VjHBye-R-H663NtjNgm42sbYm77yHFJjci15-3DvZaAJHs90Kbmqdwf1CbXMRrzSIfOctxuamTQSvF4zAbhIhminfeI_gUbjSpkVwZqtUqqdAxcngNeE

Response
---------

[{"Id":2,"Name":"Resource_2","Description":"Description Of 2"}]

[/code]

[![3.4](27-2-4.jpg)](27-2-4.jpg)Result :

[![3.5](27-2-5.jpg)](27-2-5.jpg)
