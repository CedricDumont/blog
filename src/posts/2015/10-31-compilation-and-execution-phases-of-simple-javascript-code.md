---
date: "2015-10-31T08:26:24Z"
title: "Compilation and Execution phases of simple Javascript code"
categories: ["javascript"]
tags: []
excerpt: "<details><summary>Some thoughts on : \"Is javascript a compiled language\" and disclaimer</summary>..."
---

<details><summary>Some thoughts on : "Is javascript a compiled language" and disclaimer</summary>

<section>If you search wikipedia for the definition of [interpreted language](https://en.wikipedia.org/wiki/Interpreted_language) (which is what javascript is usually referred to), you'll come across this definition: > An interpreted language is a programming language for which most of its implementations execute instructions directly, without previously compiling a program into machine-language instructions. The interpreter executes the program directly, translating each statement into a sequence of one or more subroutines already compiled into machine code when you write javascript code, you don't hit *(CRTL+SHIFT+B)* like you would for c#, you just open your browser, target an index.html file with a ref to your whatever.js files and then it gets loaded and "interpreted" right? ... or not ? If you go to the ECMAScript 5.1 specs [1] it states this : > A web browser provides an ECMAScript host environment for client-side computation including, for instance, objects that represent windows, menus, pop-ups, dialog boxes, text areas, anchors, frames, history, cookies, and input/output. so the scripting language (web scripting language) allows us to interact with this host environment. so in a sense it is not compiled, but only allow us to interact with some compiled elements, objects.... but wait ... when the file is loaded in a browser like Chrome for instance, it seems it is processed some how. and after some googling, the responsible for this is [V8](https://code.google.com/p/v8/). what does V8 do .... you guess it : > V8 compiles JavaScript to native machine code (IA-32, x86-64, ARM, PowerPC, IBM s390 or MIPS ISAs)before executing it [3] <small>(it seems Rhino [4] does the same for Mozilla browsers : it compiles javascript code to java Bytecode)</small>So javascript **compiles** to machine code in a certain way at the end ... **Disclaimer** : I am not a javscript expert, so take this content with caution and if you want to deep dive into javascript, I would recommend you to read [Kyle Simpson's books](https://github.com/getify/You-Dont-Know-JS).
</section>

* * *

[1] [ECMAScript 5.1](http://www.ecma-international.org/ecma-262/5.1/)[2] [interpreted language definition](https://en.wikipedia.org/wiki/Interpreted_language) [3] <a>V8 engine wikipedia</a> [4] [Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino)

* * *

</details>

# Example code

```

var foo = "bar";

function bar() {
    var foo = "baz";

    function baz(foo) {
        foo = "bam";
        bam = "yay";
    }
    baz(); 
}

bar();
console.log(foo);
console.log(bam);
baz();
```

# Compilation (link) phase

for this compilation phase let's stick to Kyle Simpson's explanation of this phase. This helped me understand a lot about some (common) mistakes and avoid them ... let's start with a "simple" example and apply it's simple rules.

**In the Global scope**
- _Hey global scope, I have a declaration for variable foo.. so the global scope will register it._
- _Hey global scope, I have a bar() function declaration.. it will be registered in the global scope_
    **now we enter the scope of bar:**
    - _Hey scope of bar, I have a declaration for variable foo ... so the scope of bar will register it._
    - _Hey scope of bar, I have a baz() function declaration ... so the scope of bar will register it_
       **now we enter the scope of baz**
       - _Hey scope of baz, I have a declaration for identifier called foo ... so the scope of baz will register it._

This ends the compilation phase:

```

Scope     declaration     value
------    -----------     -----
global    foo             variable
global    bar             function

bar       foo             variable
bar       baz             function

baz       foo             variable

```

# execution phase :

<small>_(note fro the reminder : LHS = Left Hand Side and RHS = Right Hand Side)_</small>

line 1 : _Hey global scope, I have an **LHS** reference for variable called foo, do you have it ?_
=> the global scope has it and give it to perform the assignment.

line 2 to 12 : nothing to execute for now

line 13 : _Hey global scope, I have an **RHS** for variable called bar, do you have it ?_
=> yes, and the global scope will return it to the caller. in fact this is a function and giving it the parenthesis, we will execute it.

line 4 : _Hey scope of bar, I have an **LHS** reference for variable called foo, do you have it ?_
=> yes and it is returned for assignment.
<small>var foo of local baz scope is _shadowing_ the var foo of global scope</small>

line 6-9: is a declaration

line 10 : _Hey scope of bar, I have an **RHS** reference for variable called baz, do you have it ?_
=> yes, here it is, and execution is done through parenthesis. fortunatly, baz is also a function that we can execute

line 7 : _Hey scope of baz, I have an **LHS** reference for variable called foo, do you have it ?_
=> yes and it is returned for assignment.

line 8 : 
- _Hey scope of baz, I have an **LHS** reference for variable called bam, do you have it ?_
=> no. => so one level up
- _Hey scope of bar, I have an **LHS** reference for variable called bam, do you have it ?_
=> no. => so one level up
- _Hey global scope , I have an **LHS** reference for variable called bam, do you have it ?_
=> no, but I create one for you, here it is, you can make your assignment.

line 14 : _Hey global scope, I have an **RHS** reference for variable called foo, do you have it ?_
=> the global scope has it and give it back. => it's vlue is 'bar' (because here we are talking about the variable foo of the global scope, not the one of the bar or baz scope.

line 15 : _Hey global scope, I have an **RHS** reference for variable called bam, do you have it ?_
=> the global scope has it and give it back. => it's vlue is 'yay'

line 16 : _Hey global scope, I have an **RHS** reference for variable called baz, do you have it ?_
=> no => for RHS, it's not going to create one for me, like it would if it had been a **LHS**
=> reference error, because there is no Identifier **baz** (this is true for strict and non strict mode)
