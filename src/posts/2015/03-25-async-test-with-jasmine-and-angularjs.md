---
date: "2015-03-25T18:00:54Z"
title: "Async Test with jasmine and angularjs"
categories: ["How-to", "javascript"]
tags: ["angularjs", "jasmine", "karma", "test"]
excerpt: "This post describes how to test angular services that makes use of promise (simple or with $http, $..."
---

This post describes how to test angular services that makes use of promise (simple or with $http, $timeout...) with the jasmine testing framework. All the code is located here : [angular-playground](https://github.com/CedricDumont/angular-playground). I use karma to display the test result. So just **_karma start_**at the root.
for more info on async support check this:

* [jasmine async support](http://jasmine.github.io/2.0/introduction.html#section-Asynchronous_Support)
* [testing promises with jasmine](http://ng-learn.org/2014/08/Testing_Promises_with_Jasmine/)

## 1\. The system under test (SUT)

I've created an angular module with a service containing async method (returning promise):

* the method **`asyncMethod`**returns a promise that is immediately resolved. if you pass _no_it will be rejected
* the method `**asyncMethodTimeOut**`returns a promise that is resolved after 1000 ms
* the method `**asyncMethodHttp**`calls and endpoint that we will mock with _$httpbackend_

[code language="javascript"]
(function () {
    'use strict';

    var module = angular.module('async-module-test', [
    ]);

    module.factory('sampleAsyncService', function ($q, $timeout, $http) {

        return {
            asyncMethod: asyncMethod,
            asyncMethodTimeOut: asyncMethodTimeOut,
            asyncMethodHttp: asyncMethodHttp
        };

        function resolveIt(val) {
            if (val === 'no') {
                return false;
            }
            return true;
        }

        function asyncMethod(val, failInResolve) {
            var deferred = $q.defer();

            var resolveValue = 'resolved!';

            if (failInResolve) {
                resolveValue = $q.reject('failing resolve!');
            }

            if (resolveIt(val)) {
                deferred.resolve(resolveValue);
            } else {
                deferred.reject('rejected');
            }

            return deferred.promise;
        }

        function asyncMethodTimeOut(val) {
            var deferred = $q.defer();

            $timeout(function delayed() {
                if (resolveIt(val)) {
                    deferred.resolve('resolved!');
                } else {
                    deferred.reject('rejected!');
                }
            }, 1000);

            return deferred.promise;
        }

        function asyncMethodHttp() {
            // using a fake endpoint (we will mock the result in jasmine test)
            return $http.get('http://localhost:8000/myEndpoint').then(function (data) {
                return data.data;
            });
        }
    });

})();
[/code]

## 2\. Writing the test

We need to bootstrap the module and set some dependencies. we do it the following way

```

    var _sampleAsyncService;
    var _$httpBackend;

    //bootstrap the module
    beforeEach(module('async-module-test', function () {

    }));

    //inject some dependencies : 
    beforeEach(inject(function ($httpBackend, sampleAsyncService) {
        _$httpBackend = $httpBackend;
        _sampleAsyncService = sampleAsyncService;
    }));
```

at line 10, we inject some angular service. The inject can be called before each test or per test.

#### simple AsyncMethod

```

     it('simple async should pass', function (done) {
        inject(function ($rootScope) {
            var testMethod = function (result) {
                expect(result).toBe('resolved!');
            }

            var testFail = function (err) {
                fail();
            }

            var promise = _sampleAsyncService.asyncMethod('yes', false);

            promise.then(testMethod).catch(testFail).finally(done);

            $rootScope.$apply();
        });

    });
```

notice that we injected the $rootScope. (we could have done so globally. it's just to show that it's possible).

> we need $rootScope because it Propagate promise resolution to 'then' functions using the $apply() function.

we also added a **_testFail_**function that is called in the catch of the promise. here we test that it's not called and if called, it will cause the test to FAIL. We test this in the next test :

```

    it('simple async should be rejected', function (done) {

        inject(function ($rootScope) {
            var testMethod = function (result) {
                fail();
            }

            var testFail = function (err) {
                expect(err).toBe('failing resolve!');
            }

            var promise = _sampleAsyncService.asyncMethod('yes',true);

            promise.then(testMethod).catch(testFail).finally(done);

            $rootScope.$apply();
        });

    });
```

On line 12, we ask the method to reject the promise. We pass **$q.reject('failing resolve!')** in the **deferred.resolve()** in the **asyncMethod** check the angular sampleAsyncService code.
If you try to remove the  _$rootScope.$apply();_, or put it in comment, it will end up in an error in the karma output.

```
Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL. Chrome 41.0.2272 (Windows 7): Executed 4 of 4 (1 FAILED) (5.087 secs / 5.083 secs)
```

The default timeout for jasmine is 5 sec.

#### AsyncMethod with timeout

```

    it('timeout should be successfull', function (done) {
        inject(function ($timeout) {

            var testSuccess = function (result) {
                expect(result).toBe('resolved!');
            }

            var promise = _sampleAsyncService.asyncMethodTimeOut('yes');

            promise.then(testSuccess).then(done);

            //$timeout.flush(100);
            $timeout.flush(1001);
        });

    });
```

Notice the call to **$timeout.flush(1001)**. it's one millis more than one second. (we do this because in our service method, the timeout is set to 1000ms.) 
If you comment this line and uncomment the line above : **$timeout.flush(100)**. it will end up in the same error as above.

#### AsyncMethod with ajax call

```

it('test async http', function (done) {

        var mockReturendValue = 'mocked returned value';

        var testMethod = function (data) {
            expect(data).toBe('mocked returned value');
        };

        _$httpBackend.when('GET', 'http://localhost:8000/myEndpoint').respond(mockReturendValue);

        _sampleAsyncService.asyncMethodHttp().then(testMethod).finally(done);

        _$httpBackend.flush();

    });

```

Here, we use **$httpBackend** to retrun a mocked value everytime the 'http://localhost:8000/myEndpoint' is called. we also need to call $httpBackend.flush() to resolve the function.

#### Test Passes but SHOULD NOT

Notice that in the last two method, we didn't put any testFail method to be called if the promise is rejected. This can cause our test to pass silently. 
The following test passes, but its **SHOULD NOT**. The **expect()** method here is not even called.

```

it('passes silently', function (done) {

        inject(function ($rootScope) {
            var testMethod = function (result) {
                dump('this is not called');
                expect(result).toBe('resolved!');
            }

            /*var testFail = function (err) {
                fail();
            }*/

            var promise = _sampleAsyncService.asyncMethod('yes', true);

            promise.then(testMethod)
            //    .catch(testFail)
                .finally(done);

            $rootScope.$apply();
        });

```

if you uncomment line 9-10-11 and 16, you will notice that in fact, the test fails.