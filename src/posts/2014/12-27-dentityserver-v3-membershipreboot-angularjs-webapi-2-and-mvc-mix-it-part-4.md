---
path: "/pages/2014/12/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-part-4/"
date: "2014-12-27T10:32:14Z"
title: "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Part 4"
categories: []
tags: []
excerpt: "HomeIn this part, we will create a web based UI using AngularJsand SemanticUI. I am not going to di..."
single: true
---

[Home](http://cedric-dumont.com/tutorials/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it-introduction/ "IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! : Introduction")

In this part, we will create a web based UI using [AngularJs](https://angularjs.org/)and [SemanticUI](http://semantic-ui.com/). I am not going to dive in details, but will explain the solution I build up to use Identityserver.v3 as the Authentication mechanism and memberShipReboot as the User Account repository.

Step 1 : create a new Empty Web Project

Create a new Empty web project with no authentication

[![4.1](27-5-1.jpg)](27-5-1.jpg)

**Step 2 : install Semantic-UI and AngularJS**

Download and extract Semantic-Ui folder. In the solution, I've created a '_content_' and a '_script_' folder. From the '_dist_' folder located in the extracted semanti-ui file, get the _themes_ folder and the file _semantic.css_. Copy them in the '_content_' folder of the solution

Also get the _semantic.js_ file in that '_dist_' directory and copy it to the solution's '_script_' folder.

You must also download _angular.js_ file and _angular-route.js_ file from angularjs web site and copy them in the _script_ folder of the solution

N.B.: You can also use CDN for that

I also use a local storage service ([https://github.com/grevory/angular-local-storage](https://github.com/grevory/angular-local-storage))to store the Auth token received from Identityserver.v3.

So dowload and copy that file in the _script_ directory.

Create an index.html file and reference all these scripts. Don't forget Jquery (required for semantic-UI).

You should end up with something like this:

[![4.2](27-5-2.jpg)](27-5-2.jpg)

The app folder will contain our angularJs app. We will name it IdentityApp. Check in the body tag of the index.html file where it is referenced.

Now that all framework are configure, let's start with the angular app.

**Step 3 : the angular App**

If you open the app folder you will see the following:

* the app.js file in which I reference the dependencies

[code language="javascript"]
    var app = angular.module('identityApp', [
        'ngRoute',
        'LocalStorageModule',
        'common'
    ]);
[/code]

* The _common_service is a convenience service (kind of a bag) that has dependencies on the _logger_ service, the _$q service_. It also provides some helper methods. (This pattern is stolen from [John Papa's hottowel](http://www.johnpapa.net/hottowel/))

* The config.route.js file is for mapping routes to the controllers. In this application, I have 2 routes : _'/account'_ that forwards to the account controller and template _'/resources'_ route that forwards to the resource controller and template

* the config.js file adds a config objects. In there, I've configured the different url to my api's and also the url to the identityserver (your urls might be different)

``` var apiUrl = 'http://localhost:10073/'; var idsrvUrl = 'https://localhost:44305/identity/'; var publicApiUrl = 'http://localhost:14117/' var api = { account: apiUrl + 'api/account/', connect: idsrvUrl + 'connect/token', resource : publicApiUrl + 'resource/' }; ```

* the _account and resources_ directory contains both an _.html_ file (the views) and a _.js_ file (the controller for each view)

* the _services_folder contains the _common and logger_service files and also the **authService**.

* The _authService_contains the methods to create accounts and also login and logout.

the create function calls our 'private api'. ``` register: function (credentials) { return $http.post(config.api.account + 'create', { Username: credentials.userName, Password: credentials.password, Email: credentials.email }) .success(function (data, status, headers, config) { }); }, ``` The login function get a token from the identityserver and store it in the session. [code language="javascript"] login: function (credentials) { var user = { grant_type: 'password', username: credentials.userName, password: credentials.password, scope: 'openid publicApi' }; //required for Idsrv V3 call (required bys spec) var urlEncodedUrl = { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic SWRlbnRpdHlXZWJVSTpzZWNyZXQ=' }; return $http({ method: 'POST', url: config.api.connect, headers:urlEncodedUrl, data: user, transformRequest: function (obj) { var str = []; for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); return str.join("&"); } }).success(function (data, status, headers, config) { Session.create(data.access_token, credentials.userName, 'admin'); localStorageService.set('bearerToken', data.access_token); }).error(function (data, status, headers, config) { Session.destroy(); }); }, [/code] There is also an authInterceptor configured to add the beare token on each request if present. ``` request: function (config) { console.log('bearer : '); console.log(localStorageService.get('bearerToken')); config.headers = config.headers || {}; if (localStorageService.get('bearerToken')) { config.headers.Authorization = 'Bearer ' + localStorageService.get('bearerToken'); } return config; }, ```

* the app/account/account.js file contains the controller that depends on the AuthService.

all function call the corresponding AuthService method and manages some scope variable for the view to display correctly. These views are only implemented to display the functionalities.

[code language="javascript"]
       function register(credentials) {
            log(credentials);
            AuthService.register(credentials).then(function (data, status, headers, config) {
                $rootScope.$broadcast(AUTH_EVENTS.registrationSuccess);
                successLogger('registered');
                resetView();
            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.registrationFailed);
                errorLogger('notregistered');
            });
        };

        function login(credentials) {
            AuthService.login(credentials).then(function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, [credentials.email]);
                successLogger('logged in ' + AuthService.isAuthenticated());
                vm.authenticated = true;

            }, function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                vm.authenticated = false;
            });
        };

        function logout() {
            AuthService.logout();
            vm.authenticated = false;

        };
[/code]

* the app/resource/resource.js file just get a resource based on it's id.

if your are not authenticated the get will fail.
if you are authenticated, the resource will display.
Once again, the UI is really simple for convenience. The getResource method just call te _$http.get()_ and the _authInterceptor_ will set the bearer token if present. so we do not care about headers here.

**Step 4 : Test It**

To test the application, you must run all projects together. Therfor, you need to set the solution with multiple startup project.
Right click on the solution and select **_Set Startup Projects ..._**

[![4.3](27-5-3.jpg)](27-5-3.jpg)

Then hit **F5**

You will have 4 tabs that will open in your browser.

locate the tab showing the web UI and enter [http://localhost:5101/#/resources](http://localhost:5101/#/resources) in the adress bar.

enter '1' in the inputfield and normally, you should have the message that we could not load the resource.

now enter http://localhost:5101/#/account in the adress bar and connect with user 'test' and password 'test' (or another user you created with fiddler.

you should see this if everything went well:

[![4.5](27-5-4.jpg)](27-5-4.jpg)

then enter the following in the adress bar : http://localhost:5101/#/resources

if you cannot load the resource, then open the developer console (CTRL + SHIFT + I) and check if you have the following error:

[![4.6](27-5-5.jpg)](27-5-5.jpg)

If so, don't forget to change the Cors settings in your controller and check in startup that it's enabled.

you should see the following result:

[![4.7](27-5-6.jpg)](27-5-6.jpg)

Let's create a new account (test1 with password test1)

[![4.8](27-5-7.jpg)](27-5-7.jpg)

then log into it with credentials test1/test1 and get the resource, it should go fine.

Now Here I have got  a question : Is it the right way to do it. Because here, I need to put in the client application (javascript) the clientId and client secret. I could use another flow (like implicit flow) but then the user would be redirected to a consent screen to authorize the application (I am in) to access the application. It's a bit weared here.

When I found a better way to do, I will update this doc. please feel free to add comments.

## Comments from WordPress

* ![John](https://www.gravatar.com/avatar/46af482bbadaf66e0507f3a2804b3ec2?d=identicon) **John** 2015-01-29T16:42:24Z
  > Hi, i'm testing your samples and i'm getting an error on app/directives/iValidateAntiForgeryToken.js as nosuch file exists. Where can i find it? Does it has something to do with http://www.fredonism.com/archive/protect-your-web-api-from-csrf-attacks.aspx?
  > 
  > Best Regards
* ![cedricdumontc](https://www.gravatar.com/avatar/0c2381d0c8780aa27737666af4c913f6?d=identicon) **[cedricdumontc](http://cedricdumont.wordpress.com)** 2015-01-29T17:44:29Z
  > you can delete it. it requires using of mvc, but here i didn t want to use mvc. so i left this for the moment. i m still looking for an anti forgery protection but don t know if its necessary in this configuration . i will delete it from the sources
* **[IdentityServer.v3, MembershipReboot, AngularJs, WebApi 2 and MVC : Mix It ! | {&quot;@id&quot;:&quot;cedric-dumont.com&quot;}](http://cedric-dumont.com/2014/12/26/identityserver-v3-membershipreboot-angularjs-webapi-2-and-mvc-mix-it/)** 2014-12-27T14:41:17Z
  > [&#8230;] links to parts : part 1 - part 2 - part 3 &#8211; part 4 &#8211; part [&#8230;]
* ![Patrick](https://www.gravatar.com/avatar/a49ddd726fa242c6667682bbb78ce0d0?d=identicon) **Patrick** 2015-02-25T19:40:31Z
  > Hi Cedric, first of all - great post! I think the "Resource Owner Password Credentials" flow is not recommended to use in a SPA because you expose the client secret. There is an authorization / authentication endpoint in idsvr3 where you can either request access tokens or authorization codes (implicit or authorization code flow). I believe the implicit flow is the right choice because it is the only way to request a token without exposing your client secret in your js code. 
  > 
  > 
  > 
  > cheers
* ![cedricdumontc](https://www.gravatar.com/avatar/0c2381d0c8780aa27737666af4c913f6?d=identicon) **[cedricdumontc](http://cedricdumont.wordpress.com)** 2015-02-25T19:45:17Z
  > i totally agree and i related this in the post. it s not good to expose the client secret and it brings us back to as if we use basic authentication. but what i want is not to be redirected to the id server login page but to use a login page in my app.
* ![John](https://www.gravatar.com/avatar/46af482bbadaf66e0507f3a2804b3ec2?d=identicon) **John** 2015-01-30T11:16:26Z
  > It's working now with the exception that  localStorageService.set('bearerToken', data.access_token) is throwing an error and later no Bearer Token is sento to the API. Any clue? I've just downloaded the angular-local-storage.js file...
* ![cedricdumontc](https://www.gravatar.com/avatar/0c2381d0c8780aa27737666af4c913f6?d=identicon) **[cedricdumontc](http://cedricdumont.wordpress.com)** 2015-01-30T13:43:28Z
  > what is the error? I see that angular-local-storage is already configured in the sources
* ![John](https://www.gravatar.com/avatar/46af482bbadaf66e0507f3a2804b3ec2?d=identicon) **John** 2015-01-30T19:26:24Z
  > It gives me null value in angular-local-storage.js when setting the store for any value...
  > 
  > I've commented the LocalStorage writes and used the Session Object instead...
* ![John](https://www.gravatar.com/avatar/46af482bbadaf66e0507f3a2804b3ec2?d=identicon) **John** 2015-02-25T19:52:48Z
  > That's why the Implicit flow (by design) does not use any client secret, isn' it? And i guess that the Resource Owner Password Flow is suited when you can achieve Direct Authentication, otherwise we will end up with browser redirection's with your Identity Provider/Outhorization Server...
* ![Patrick](https://www.gravatar.com/avatar/a49ddd726fa242c6667682bbb78ce0d0?d=identicon) **Patrick** 2015-02-25T21:15:10Z
  > Yes, i think the only way to use your own login form without beeing redirected is to do the authentication in your web api backend. There you can use the client secret in a secure way. But i don't like the idea of mixing authentication with business logic. But what's the downside of redirecting to a login page? I think you can customize the idsrv3 login page and maybe you could even integrate the login form into your app so you don't have to redirect? Auth0 has this feature... maybe idsvr3 too?
* ![James McLachlan (@jamespmclachlan)](https://www.gravatar.com/avatar/76dda9b349d16660931d28c81551c157?d=identicon) **[James McLachlan (@jamespmclachlan)](http://twitter.com/jamespmclachlan)** 2016-02-29T13:22:54Z
  > Regarding the password/implicit flow client secret issue: one idea I read about is to have an API call in your UI project that accepts just a name and password and makes the grant_type password call with the secret. The call can then return the token details.
  > 
  > Thanks for the fantastic set of blog posts!
* ![Lasha Kvantaliani](https://www.gravatar.com/avatar/b2593dc738a7bbc8298ec52ca4cb9733?d=identicon) **[Lasha Kvantaliani](http://ribbler.com)** 2015-09-09T08:57:15Z
  > Hi, Where may I find "common" module? 
  > 
  > Guess Session.create and other methods comes from this module.
  > 
  > 
  > 
  > In general after init a project app I have know app folder. (just for information - I'm using VS 2015)
