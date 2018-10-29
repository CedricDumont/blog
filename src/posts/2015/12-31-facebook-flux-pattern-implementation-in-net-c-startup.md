---
date: "2015-12-31T14:41:51Z"
title: "Facebook Flux Pattern implementation in .Net (c#): Startup"
categories: ["c#", "javascript"]
tags: ["Flux", "react", "signalR"]
excerpt: "(Code on Github : Flux.Net)These days, I took some time to learn facebook's React and like everyone..."
---

(Code on Github : [Flux.Net](https://github.com/CedricDumont/Flux.Net))

These days, I took some time to learn facebook's **React** and like everyone, came across their **[Flux](https://facebook.github.io/flux/docs/overview.html#content)** Pattern. if I can resume or take one sentence that seemed to be important is this idea:

> **Flux is used to have a more predictable system**.

When looking at the pattern, and trying their _Todo or Chat apps_, it is not really clear where the call to the server occurs or at least it's not yet standardized.(as far as I know).

Flux is stated to be a frontend framework, but wait, why would this pattern be more obvious as a frontend pattern. 

So, just for learning purposes, and hopefully to start a good in depth discussion arround it, I started a c# implementation of flux to understand the bits and pieces and where they should fit in.

If you would like to start the discussion, check the code here : [Flux.Net](https://github.com/CedricDumont/Flux.Net)
You can clone the project and go to each Tag to see evolution of the code or simply download each release.

### [v0.0.1](https://github.com/CedricDumont/Flux.Net/releases/tag/v0.0.1)

This implementation just takes all the component of Flux (Dispatcher, Action, Store). I made them work together just to have an idea of their interactions (as it would if it was written in javascript).
Just start the **Flux.Net.Cmd** project. But I tell you, it's a Naive and BASIC implementation. (and perhaps with some errors regarding the pattern)

### [v0.0.2](https://github.com/CedricDumont/Flux.Net/releases/tag/v0.0.2)

In this iteration, I made some code refactoring just to implement something more closer to the Chat application that facebook presents.

### [v0.0.3](https://github.com/CedricDumont/Flux.Net/releases/tag/v.0.0.3)

This release puts SignalR in the Mix. I will use SignalR to notify clients of changes in the store. The store is on the backend... and here the clients runs in a browser... (a kind of a mix of [SignalR chat demo](http://www.asp.net/signalr/overview/getting-started/tutorial-getting-started-with-signalr) app and Facebook's [Flux Chap application](https://facebook.github.io/flux/docs/chat.html#content)...)

### Next Steps

* create some kind of generic implementation
* put React in the mix where a component would listen to the Store changes (store located on the server)

This will be part of a new Post...and before it, I Hope to start a good discussion on this implementation.
