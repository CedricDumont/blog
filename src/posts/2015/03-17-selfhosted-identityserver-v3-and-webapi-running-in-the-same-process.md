---
date: "2015-03-17T19:00:51Z"
title: "selfhosted IdentityServer v3 and WebApi running in the same process"
categories: ["c#", "security"]
tags: []
excerpt: "This article walks through creating a project in visual studio to run Identity Server V3 as self-ho..."
---

This article walks through creating a project in visual studio to run Identity Server V3 as self-hosted, so we won't required IIS and we will use this installation to test some of [angular-toolkit](https://github.com/CedricDumont/angular-toolkit) functionalities.

For more in depth information, this article is based on this post : [Creating the simplest OAuth2 Authorization Server, Client and API](http://identityserver.github.io/Documentation/docs/overview/simplestOAuth.html). The difference here is that we will put everything in one selfhosted project. (we will host multiple server in one process)

the code is available here : [https://github.com/CedricDumont/angular-toolkit](https://github.com/CedricDumont/angular-toolkit)

###### 1\. Create a Console application in VS

[![ScreenShot002](17-1.jpg?w=700)](17-1.jpg)

###### 2\. Install the required nuget packages

In the nuget package manager console launch the following :

```

Install-Package Microsoft.AspNet.WebApi.OwinSelfHost
Install-Package Thinktecture.IdentityServer3
Install-Package Thinktecture.IdentityServer3.AccessTokenValidation
Install-Package Thinktecture.IdentityModel.Client
Install-Package Microsoft.AspNet.WebApi.Cors
```

###### 3\. Create the Scopes, Clients and Users class (Configuration classes)

we will use the InMemory facilities here

**Scopes.cs**

```

static class Scopes
{
    public static List<Scope> Get()
    {
        return new List<Scope>
        {
            new Scope
            {
                Name = "api1"
            }
        };
    }
}
```

**Clients.cs**

```

 static class Clients
    {
        public static List<Client> Get()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientName = "MyApp",
                    ClientId = "MyAppClientId",
                    Enabled = true,
                    AccessTokenType = AccessTokenType.Reference,

                    Flow = Flows.ResourceOwner,
                    ClientSecrets = new List<ClientSecret>
                    {
                        new ClientSecret("21B5F798-BE55-42BC-8AA8-0025B903DC3B".Sha256())
                    }
                }
            };
        }
    }
```

**Users.cs**

```

static class Users
    {
        public static List<InMemoryUser> Get()
        {
            return new List<InMemoryUser>
            {
                new InMemoryUser
                {
                    Username = "testUser",
                    Password = "testPwd",
                    Subject = "I am the Subject"
                }

            };
        }
    }
```

###### 3\. create the controller

[code language="csharp"]
 [Route("test")]
    public class TestController : ApiController
    {
        public IHttpActionResult Get()
        {
            var caller = User as ClaimsPrincipal;

            var subjectClaim = caller.FindFirst("sub").Value;

            return Json(new
            {
                message = "You See this then it's ok",
                subject = subjectClaim
            });
        }
    }
[/code]

###### 4\. Create the Startup and Program class

We will have multiple server using the same Startup.cs Owin file and running in the same process.... To solve this I use this trick:

Create a **MultipleServerHelper.cs** class

```

    public class MultipleServerHelper : IDisposable
    {
        private readonly IDisposable _authServer;

        private readonly IDisposable _apiServer;

        public MultipleServerHelper()
        {
            _authServer = WebApp.Start(Constants.AuthorizationUrl, app =>
            {
                // add a prop to identify this server in the Startup.cs
                app.Properties.Add("AuthServer", true); 
                var startup = new idsrv3.Startup();
                startup.Configuration(app);
            });

            _apiServer = WebApp.Start(Constants.ApiUrl, app =>
            {
                // add a prop to identify this server in the Startup.cs
                app.Properties.Add("ApiServer", true);
                var startup = new idsrv3.Startup();
                startup.Configuration(app);
            });
        }

        public void Dispose()
        {
            _authServer.Dispose();

            _apiServer.Dispose();
        }
    }
```

Create the owin startup class will look like the following:

[code language="csharp"]
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            if (app.Properties.ContainsKey("AuthServer"))
            {
                //
                //IDsrv3 Section
                //
                var factory = InMemoryFactory.Create(
                                    scopes: Scopes.Get(),
                                    clients: Clients.Get(),
                                    users: Users.Get());

                var options = new IdentityServerOptions
                {
                    Factory = factory,
                    CorsPolicy = CorsPolicy.AllowAll
                };

                app.UseIdentityServer(options);
            }
            else if (app.Properties.ContainsKey("ApiServer"))
            {
                //
                // api section
                //
                app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
                {
                    Authority = Constants.AuthorizationUrl,
                    RequiredScopes = new[] { "api1" }
                });

                //configure web api
                var config = new HttpConfiguration();
                EnableCorsAttribute cors = new EnableCorsAttribute("*", "*", "*");
                config.EnableCors(cors);
                config.MapHttpAttributeRoutes();
                config.Filters.Add(new AuthorizeAttribute());
                app.UseWebApi(config);
            }

        }
    }
[/code]

in the Program.cs class add the necessary code to start the two selfhosted server:

[code language="csharp"]
    class Program
    {
        static void Main(string[] args)
        {
            LogProvider.SetCurrentLogProvider(new DiagnosticsTraceLogProvider());

            using (new MultipleServerHelper())
            {
                Console.WriteLine("auth server running on : " + Constants.AuthorizationUrl);
                Console.WriteLine("api server running on : " + Constants.ApiUrl);
                Console.WriteLine("");
                Console.WriteLine("server running...");
                TokenResponse testToken = GetUserToken();
                Console.WriteLine("token test is : " + testToken.AccessToken);
                Console.WriteLine("call api ");
                Console.WriteLine(CallApi(testToken));

                Console.ReadLine();
            }
        }

        static TokenResponse GetUserToken()
        {
            var client = new OAuth2Client(
                new Uri(Constants.AuthorizationUrl + "/connect/token"),
                "MyAppClientId",
                "21B5F798-BE55-42BC-8AA8-0025B903DC3B");

            return client.RequestResourceOwnerPasswordAsync("testUser", "testPwd", "api1").Result;
        }

        static String CallApi(TokenResponse response)
        {
            var client = new HttpClient();
            client.SetBearerToken(response.AccessToken);

            return client.GetStringAsync(Constants.ApiUrl + "/test").Result;
        }
    }
[/code]

and to be complete, this is the **Constants.cs** class

```

    public sealed class Constants
    {
        public const String AuthorizationUrl = "https://localhost:44333";

        public const String ApiUrl = "http://localhost:8000";
    }
```