---
date: "2019-03-09T14:13:12Z"
title: "Part 1 of Full Fsharp stack : A Fable of web"
categories: ["tools"]
tags: ["code"]
excerpt: "If you have a c#, java, js background like me it might be difficult to dive into this functional f# web stuff like fable and giraffe..."
---

If you have a c#, java, js background like me it might be difficult to dive into this functional [f#](https://fsharp.org/) web stuff like [Fable](https://fable.io/) and [Giraffe](https://github.com/giraffe-fsharp/Giraffe)

For me the most diffcult points were the lack of documentation (or I didn't understand it). This is probably because this stack is not the common stack used for web development which in my opinion that is usually react, angular, .net or springboot, ruby on rails... 

Enough introduction, what I want is to start from a simple app with a basic frontend and a basic api backend and first start from the building blocks. see how html is produced, how message can be handled from the frontend to the backend etc.

before you dive in, it will probably be better to learn some f# [get-programming-with-f-sharp](https://www.manning.com/books/get-programming-with-f-sharp) or [mastering-f](https://www.packtpub.com/application-development/mastering-f) or the good web site [fsharp for fun and profit](https://fsharpforfunandprofit.com/) or ...


## Tooling

to install my dev environment on a mac, I followed this path:
- follow this to install Mono, f# etc : https://fsharp.org/use/mac/ (use Vscode part with ionide)
- also install latest node, yarn and .net core sdk
- paket is also installed as a globa tool : 

> `dotnet tool install -g paket` 

(check with paket --version  (5.198.0))

## Fable First look

let's create tha application in a rootfolder called fullfsharp

### Preparation

> mkdir fullfsharp

> cd fullfsharp

### Dotnet stuff

> dotnet new sln -n FullFsharp

> dotnet new classlib -n Client -o src -lang f#

> dotnet sln FullFsharp.sln add src/Client.fsproj

> paket convert-from-nuget

> paket add Fable.Core --project src/Client.fsproj

### Javascript stuff

> yarn init -y

> yarn add @babel/core fable-compiler fable-loader webpack webpack-cli webpack-dev-server -D

create a *webpack.config.js* file at the root with the following content

```js
var path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/Client.fsproj",
    output: {
        path: path.join(__dirname, "./public"),
        filename: "bundle.js",
    },
    devServer: {
        contentBase: "./public",
        port: 8080,
    },
    module: {
        rules: [{
            test: /\.fs(x|proj)?$/,
            use: "fable-loader"
        }]
    }
}
```

create a simple index.html file in a public folder with the following content

```html
<!doctype html>
<html>
    <head>
        <title>FullFSharp</title>
    </head>
    <body>
        <script src="bundle.js"></script>
    </body>
</html>
```
### Add F# code and run

add the following code in Library.fs

```fs
module Client

let add a b = a + b

printfn "add 1 and 2 = %d " (add 1 2)
```

> yarn run webpack-dev-server

you should see **add 1 and 2 = 3** in the browser's console !


### interacting with the dom

- in the index.html file add a div above the script import

```html
    <div class="myDiv"></div>
    <script src="bundle.js"></script>
```

- also add the *Fable.Import.Browser* package with paket

> paket add Fable.Import.Browser --project src/Client.fsproj

- And .... play with it. 

Sample code:

```fs
module Client

let add a b = a + b

printfn "add 1 and 2 = %d " (add 1 2)

open Fable.Import.Browser

let init() =
    let myDiv = document.querySelector(".myDiv")
    myDiv.innerHTML <- sprintf "hello you %d" (add 1 2)

init()
```

Ok, these are the basics, now I woould like to explore the communication with a web api and also the elmish stuff, it seems to be the de factor framework in the Fable world.





