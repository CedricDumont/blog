---
date: "2015-03-22T18:15:02Z"
title: "Install sinon with jasmine and Karma"
categories: ["javascript"]
tags: []
excerpt: "lately I wanted to use sinon within karma. So I simply did the following :install sinon with bower ..."
---

lately I wanted to use sinon within karma. So I simply did the following :

install sinon with bower : bower install sinon

then added the sinon.js to the karma files in the _karma.conf.js_ like so :

_`files: [ '../bower_components/angular/angular.js', '../bower_components/angular-mocks/angular-mocks.js',
'../src/**/_.js', './unit/_**_/_.js' ],`_

and use it in my jasmine test specs file.... but it didn't work.

And here is the solution:

in a command prompt, navigate to the root of your project and type :

```
npm install karma-sinon --save-dev
```

then in your karma.conf.js file add the following:

```
frameworks: ['jasmine', 'sinon']
```

You can now use sinon in your jasmine files

```

var mySUT = {
    callCallback: function (cb) {
        cb();
    }
}

 describe('spies', function () {
        it('should spy on a callback', function(){
            var spy = sinon.spy();  

            mySUT.callCallback(spy);

            expect(spy.called).toBe(true);

        });
    })

```