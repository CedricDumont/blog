---
date: "2015-04-12T15:52:40Z"
title: "Aurelia get started cheat sheet - installation steps"
categories: ["How-to", "javascript"]
tags: ["aurelia"]
excerpt: "This post briefly lists the step you must do to start coding an Aurelia powered app. for the long s..."
---

This post briefly lists the step you must do to start coding an Aurelia powered app. for the long story go to [Aurelia Get started page](http://aurelia.io/get-started.html).

1. [install node](https://nodejs.org/) or update to the [latest version](https://github.com/npm/npm/wiki/Troubleshooting#try-the-latest-stable-version-of-node). this step is **important**.

2. install gulp globaly :

    ```
    npm install -g gulp
    ```

3. install jspm globaly:

    ```
    npm install -g jspm
    ```

4. configure jspm with github credentials : (follow instructions)

    ```
    jspm registry config github
    ```

5. download the skeleton app : [https://github.com/aurelia/skeleton-navigation/releases](https://github.com/aurelia/skeleton-navigation/releases) and extract it to a folder of your choice

6. navigate to the root of the app :

    ```
    cd C:\_temp\GitHub\aurelia-playground\skeleton-navigation-0.12.0
    ```

7. launch npm and jspm install

    ```
    npm install jspm install -y
    ```

8. launch the command to start a webserver that listens on : [http://localhost:9000/](http://localhost:9000/)

    ```
    gulp watch
    ```

#### History :

12/04/2015 : tested with v0.12
