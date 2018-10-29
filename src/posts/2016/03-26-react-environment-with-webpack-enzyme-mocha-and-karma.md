---
date: "2016-03-26T15:22:57Z"
title: "React environment with Webpack, Enzyme, Mocha and Karma"
categories: ["Development Tools", "javascript"]
tags: ["karma", "nono", "react", "test"]
excerpt: "This is the first post describing the development of a new Blogging engine using React that I am bu..."
---

This is the first post describing the development of a new Blogging engine using React that I am building for fun. This first post describes the environment setup and add some more information on how to use these frameworks.

The code can be found here : https://github.com/non-o/nono-blog, and this post is mainly targeted to the v0.1.0 tag. so you can clone the repository and then checkout the v0.1.0 tag to follow. (or to get an inital setup for your project)

to get it working just clone the repo and run npm install

```text
>git clone https://github.com/non-o/nono-blog.git

>cd nono-blog

>npm install

```

The setup is made so that you can use es6 to code your react components, when you run the app with the following command:

```text
>npm start

```

Then navigate to http://localhost:8080/public/index.html it will start the webpack dev server and will hot deploy as you change your code.

for testing, I use karma, mocha and enzyme to test the React components. When changing the code or the tests, their are automatically rerun.

```text
>npm test

```

If you want to debug, when chrom starts karma, there is a debug button that opens a new tab, press CTRL+SHIFT+I to get the developer tools and you can navigate to your files and set breakpoints. you can also use the `debugger;` to hit when loading the page and you ready to develop a beautifull app.

Remember the advice:

> Don't write code that you don't know how to test

I hope that with the following setup, I'll be able even to test React UI components.

* * *

for more info check the following great tools:

* [Enzyme](http://airbnb.io/enzyme/)
* [Babel](https://babeljs.io) (this page also helped me a lot : [setup](https://babeljs.io/docs/setup))
* [Karma](https://karma-runner.github.io/0.13/index.html)

These posts also helped me to setup this environment :

* [Testing ReactJS Components with Karma and Webpack](https://www.codementor.io/reactjs/tutorial/test-reactjs-components-karma-webpack)
* [Enzyme: JavaScript Testing utilities for React](https://medium.com/airbnb-engineering/enzyme-javascript-testing-utilities-for-react-a417e5e5090f#.tecgioh0y)

These repositories were valuable also:

* [Using Enzyme with Webpack](https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md)