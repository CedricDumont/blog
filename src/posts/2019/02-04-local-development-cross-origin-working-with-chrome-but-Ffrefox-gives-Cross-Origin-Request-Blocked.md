---
date: "2019-02-04T19:05:54Z"
title: "Local development Cross Origin working with chrome, but Firefox gives Cross-Origin Request Blocked"
categories: ["tools"]
tags: ["ssl", "firefox","error","cors"]
excerpt: "Accessing a local application with XHR request worked in chrome, but Firefox gave Cross-Origin Request Blocked error..."
---

Accessing a local application with XHR request worked in chrome, but Firefox gave the error that **Cross-Origin Request Blocked** and in fact didn't even read the stream.

**This is not a cors problem per se**, but the fact that Firefox gave an exception on the certificate which is **self-signed**.

What must be done:

- In firefox dev tools, open the network tab and copy the url accessed with Options (the devtool gave no status for it)
- copy the adress in the browser (Firefox) : https://localhost:1234/yoururl
    - A message will prompt stating that your connection is not secure
    - click the *Advanced* button, then *Add Exception...*
    - Add an exception to https://localhost:1234  (Firefox copied the whole url, just delete the parts and keep *localhost:port*)
    - Click *Confirm Security Exception*
    
