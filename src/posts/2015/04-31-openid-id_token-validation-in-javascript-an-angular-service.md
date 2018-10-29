---
date: "2015-03-31T15:29:37Z"
title: "openId id_token validation in javascript (an angular service)"
categories: ["javascript", "security"]
tags: ["angularjs", "IdentityServer.v3", "openid"]
excerpt: "This post is related to the following stackoverflow question : How can I validate an openId id_toke..."
---

This post is related to the following stackoverflow question : 
[How can I validate an openId id_token in javascript](http://stackoverflow.com/questions/29272734/how-can-i-validate-an-openid-id-token-in-javascript).

#### The Short story

we need to use JSWS.

1. download the libraries from [here](https://github.com/kjur/jsjws/tags/). I've downloaded version 3.0.2.

2. <dl>

    <dt>in your _index.html_,reference the **jws-3.0.js**, the **json-sans-eval.js** file that you downloaded above</dt>

    <dt>(json-sans-eval is located in [_jsjws-3.0.2\ext_] directory. (more info on it can be found here</dt>

    <dd>[json-sans-eval site](https://code.google.com/p/json-sans-eval/))</dd>

    </dl>

3. if you run the code, you will get the following exception : **b64utohex is not defined**

4. you need to reference another library. in fact I found the related project [jsrsasign](http://kjur.github.io/jsrsasign/) having the required libraries. you can download a release here : [https://github.com/kjur/jsrsasign/tags/](https://github.com/kjur/jsrsasign/tags/) I downloaded the version 4.7.0 and took out the jsrsasign-4.7.0-all-min.js file and added in referencing scripts.

Now you have all the necessary files to get it done using the following code :

```
function validateToken(id_token, cert) { var jws = new KJUR.jws.JWS(); var result = 0; result = jws.verifyJWSByPemX509Cert(id_token, cert); if (result) { result = JSON.parse(jws.parsedJWS.payloadS); } else { result = 'unable to verify token'; } return result; }
```

Token validation coming from an openid endpoint will also be part fo my [angular-toolkit project](https://github.com/CedricDumont/angular-toolkit) : check it here

Read more to get the Long story ...

#### The Long story

When getting and id_token from an openid implementation server like [thinktecture's Identytyserver](https://github.com/IdentityServer/IdentityServer3) or google openId, the [openId specification](http://openid.net/specs/openid-connect-core-1_0.html) requires that the client must [validate the id_token](http://openid.net/specs/openid-connect-core-1_0.html#ImplicitIDTValidation). Some [implementation offer an endpoint to validate the token](https://developers.google.com/accounts/docs/OpenIDConnect#validatinganidtoken) and get it back in it's json decoded and decrypted format. but this require a round trip to the server and is usually not recommended in production use.

> **how to validate the token received from one of these endpoints using javascript libraries**.

after asking on stackoverflow and googling a little, I found the javascript libraries required for validating the token could be found [here : openid libraries](http://openid.net/developers/libraries/).

As told in the short story, you can download JSWS from here: [JSWS](http://kjur.github.io/jsjws/). JSWS is a javascript implementation of [JWS](http://self-issued.info/docs/draft-jones-json-web-signature-01.html).

you can also use this manual tool to verify your token : [JWS Verifier](http://kjur.github.io/jsjws/tool_verifyanalyze.html)

Below is a full angular app with one service that validates such a token against a certificate. retrieving certificate for validation is another story, but basically, you can get them from the uri provided in the discovery document (the one you get from /.well-known/openid-configuration) the url is the one in **jwks_uri**.

based on the short story here above, here is my index.html file

```

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.js"></script>
    <script src="./jsrsasign-4.7.0-all-min.js"></script>
    <script src="./json-sans-eval.js"></script>
    <script src="./jws-3.0.js"></script>    
    <script src="./app.js"></script>
    <title>angular-jsws service</title>
</head>

<body data-ng-app="app" data-ng-controller="validateCtrl as vm">
    {{vm.title}}
    <section id="token">
        <p>paste token :</p>
        <textarea cols="100" rows="10" id="1" ng-model="vm.token"></textarea>
    </section>
    <section id="token">
        <p>paste certificate :</p>
        <textarea id="2" cols="100" rows="10" ng-model="vm.certificate"></textarea>
    </section>
    <section id="actions">
        <br/>
        <button ng-click="vm.validateWithCert()">Validate with cert</button>
    </section>
    <section id="result">
        <p> result is </p>
        <p> {{vm.result}} </p>
    </section>
</body>

</html>
```

and here is the app.js file containing the angular magic

[code language="javascript"]
(function () {
    'use strict';

    var app = angular.module('app', [
    ]);

    app.factory('idTokenValidator', [function () {
        return {
            validateToken: validateToken
        };

        function validateToken(id_token, cert) {
            var jws = new KJUR.jws.JWS();
            var result = 0;
            result = jws.verifyJWSByPemX509Cert(id_token, cert);
            if (result) {
                result = JSON.parse(jws.parsedJWS.payloadS);
            } else {
                result = 'unable to verify token';
            }

            return result;

        }

    }]);

    app.controller('validateCtrl', [
        'idTokenValidator',
        function (idTokenValidator) {
            var vm = this;

            vm.title = 'sample token validation';

            vm.token = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.qCW4l5nfdvBt-yl_OiYRFrKkribqbDbmQ9ULyemAgCNXAAr70hN5-IERIefzySpm6Er4UuX_aXcnIXgMvK-hFMFhLOuJckrDEe1Pz-OzqScvGSJUbeOsd_nB9E2BNVYZrgMESQOifiEyUtWdbzCoMgf9nQg2AEWbVSaPImqQkGp-JZsJsvMUC-3A3RcimGIjLv-A8skyhNufASd6DPgk46Ydqt6vi2L6d2InvZSkhTSsYhbfm9TgrKyA906YHE0zE-asuXAzI1ISPxAjlO8ZhekEvg6teaa-1cSQQdOFj-ZWpqVsEI1YXr7zuvugWQhqfBqqPcT6fP5t3ff8FKwV9w';

            vm.certificate = '-----BEGIN CERTIFICATE-----' +
                'MIIDMjCCAhqgAwIBAgIJAKMfG/B2MKd5MA0GCSqGSIb3DQEBBQUAMBoxCzAJBgNV' +
                'BAYTAkpQMQswCQYDVQQKEwJ6MzAeFw0xMDA1MzEwNjE4MDhaFw0yMDA1MjgwNjE4' +
                'MDhaMBoxCzAJBgNVBAYTAkpQMQswCQYDVQQKEwJ6MzCCASIwDQYJKoZIhvcNAQEB' +
                'BQADggEPADCCAQoCggEBAOKosPD1rOz6Z5wtgVBKA0XMFxfKavF09f9x3N3LlCcF' +
                '/6LTXn6/waJq93bTNBESzdw63qQl77sxFORXCVQ1Ad7CPqRbY4ywVw/8yZri9wH4' +
                'PdSfae/fg5vuN3EesLissFSceQySHbMBeqEAw84cLvPXdlecdNmlwfS6nV5D8Ijt' +
                'HkebP8R14AEpfoag3VS/YS6Hd4hmvZ1e3BJQm3JfFFVzTyZ0AH2oimsxfoQnZf7M' +
                'qyIdCgmeaKYILEyYm6PKhVwZhuD5E+WG4RxNdcGCiC8GRUr2fYnXUT0CtwrYBYgZ' +
                '121cFObeu7Z/aTIsx4MqYLHwaHqMga6U7nOHoEgqY7ECAwEAAaN7MHkwHQYDVR0O' +
                'BBYEFKO4NcUDh3J5c7XD7j4pVXnzIfALMEoGA1UdIwRDMEGAFKO4NcUDh3J5c7XD' +
                '7j4pVXnzIfALoR6kHDAaMQswCQYDVQQGEwJKUDELMAkGA1UEChMCejOCCQCjHxvw' +
                'djCneTAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBBQUAA4IBAQC8JdiwJF22/3nB' +
                'IxJT/gXXN10cub6O+x9q64ls7dpGpBvbi4/lJgZOsZqoJiswU5WOKZ4MTOmMHe4W' +
                'e/MHuhcjsgf9EHHYZQ1reBYi/l9mBBbYFGs0zSv1CyjbwkyF36nr/8sWdYf4ZtXQ' +
                'nzTGvoa6oTOOTmmj3Bwl3CHwonvgAJUCHY/UmWFzH8Sf0dDW7iJBj+ZWfjuSlSQe' +
                '2ninrEpfA4v2V1p3LOH+layZLDMJHkNCq8eoU1MbJi07cHxLWtlwliNOiRboaiYl' +
                '1wtWR7ZY4HZCPeyb0tanf58rBQAXElaCF3fmfHrlpxoJBsQP1NbFrBs2haOIEZ4E' +
                'K3V9/Bpi' +
                '-----END CERTIFICATE-----';

            vm.result = '';

            vm.validateWithCert = function () {
                vm.result = idTokenValidator.validateToken(vm.token, vm.certificate);
            };

    }]);
})();
[/code]
