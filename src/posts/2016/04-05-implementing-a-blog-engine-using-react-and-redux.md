---
date: "2016-04-05T15:30:07Z"
title: "Implementing a Blog Engine using React and Redux"
categories: ["javascript"]
tags: ["nono", "open-source", "react", "redux"]
excerpt: "This post relates to the repository non-o.blog on github and this specific tag v.0.5.0.This Blog En..."
---

This post relates to the repository [non-o.blog](https://github.com/non-o/nono-blog) on github and this specific tag [v.0.5.0](https://github.com/non-o/nono-blog/releases/tag/v0.5.0).

This Blog Engine is using React to read files (posts, pages...) from a github repo. At this time it is using React as the view engine and Redux as the application state (store). to get the code, simply clone it on your mahine and checkout the tag v0.5.0.

then just go in the src folder and type:

```text
npm install

...

npm start

```

the webpack-dev-server will start and you can browse http://localhost:8080/index.html

##### some info on the code

the starting file (entry) is _main.js_ that loads the _app-react_ component. _main.js_ links the redux store with the react components.
This app is composed by a _MenuContainer_ and a _Post or Page Container_ (depending on the user clicks that changes the redux store).

* * *

I followed the advice from redux to separate the Component in a Presentational component and a Container component and I find this clean.
_example :_

in _./components/menu_, the _MenuList and MenuItem_ are **presentational** components and only deals with props (not state) The _MenuContainer_ component connects the Redux state with the presentational components state using the redux connect() paradigm (if I can call it so...)
more info : [UsageWithReact](http://redux.js.org/docs/basics/UsageWithReact.html)

* * *

the `state`folder contains the **redux store** or more precisely the redux reducer in _blogReducer.js_ (for now only one, but I will upgrade to combine reducers).

The **actions** are located in ./app/state/actions.js where I have synchronous actions and async actions (located at the end of the file)

```javascript
export function fetchMenusAsync() {
    return function(dispatch) {
        dispatch(displayMenuInfo('... Loading Menus ...'));
        return BlogApi.getMenus(function(data) {
            dispatch(receivedMenu(data));
            dispatch(displayMenuInfo(''));
        });
    };
}
```

line 4 calls the github-api asynchronously and when the result is received, the _receivedMenu_ and the _displayMenuInfo_ are called (these two are synchronous actions)

The same process is done for ./pages and ./post

This is my first attempt to use React with redux, and there are still lots of things to implement (read the Todos on the readme page) to have a complete Blog engine (SEO with server rendering, Admin area, dashboard, comments support and lot lot more)