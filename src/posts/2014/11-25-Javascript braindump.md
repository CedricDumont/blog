---
date: "2014-11-22T00:00:00Z"
title: "Javascript braindump"
categories: []
tags: ["javascript"]
excerpt: ""
single: true
---

# Some things to know about javascript

<div id="top"></div>

### type code in Chrome console

* to make the console appear => F12
* to enter multiline code => SHIFT + ENTER
* press ENTER to execute the code

### [^](#top) function declaration vs function expressions.

> if the function keyword is the first in the statement, then it's a function declaration. Otherwise it's a function expression. (Kyle Simpson)

```

// 1\. function declaration
function foo(){} 
foo(); // no error

// 2\. function expression
var foo = function bar(){
   var baz = bar; // it's ok. bar is enclosed in its own scope
} 
bar(); // Error

// 3\. anonymous function expression
// hint : we cannot reference it for recursion, because no name.
var anotherfoo = function(){}
```

### [^](#top)lexical scope

comes from the lexing phase of the compiler => it's a compile time scope. explained [here](http://stackoverflow.com/questions/1047454/what-is-lexical-scope)

the eval() keyword cheats the lexical scope. it can add variable to the scope at runtime

```

function foo(str){
   eval(str);
   console.log(bar); // this prints 42, even though bar is not in the lexical scope
}

foo("var bar = 42;");
```

eval() made the compiler skip all optimization.

### IIFE

```

(function(){})();
(function(){}());

```

* we have a function expression thanks to the first '('.
* we immediately call it
* we isolate the scope from the global scope.
* IIFE = Immediately invoked function expression

we can pass parameters to an IIFE

```

var myVal= 42;

(function(configVal){
   console.log(configVal); // prints 42
})(myVal);
```

### var and let

```

var foo = "foo";
function bar(str){
  for(var i = 0; i < 10; i++){}
  console.log(i); // prints 10
  for(let j = 0; j < 10; j++){}
  console.log(j); // ERROR !

}
bar(foo);
```