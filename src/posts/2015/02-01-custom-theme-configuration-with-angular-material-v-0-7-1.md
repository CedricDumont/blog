---
date: "2015-02-01T16:03:58Z"
title: "Custom theme configuration with angular-material v 0.7.1"
categories: ["javascript"]
tags: ["angularjs", "material design"]
excerpt: "This post only applies to angular-material version 0.7.1 or above.Theme configuration has changed s..."
---

This post only applies to angular-material version 0.7.1 or above.

Theme configuration has changed since v 0.7 in [angular-material](https://material.angularjs.org)

If you want to define a custom theme, you need first to reference the scripts

```

   <link href="modules/angular-material/angular-material.css" rel="stylesheet" />
   <script src="modules/angular-material/angular-material.js"></script>
```

NB: the references depends on where you set your own script files.

after doing so, you have to define a custom theme and set some configuration for it :

```

    var app = angular.module('yourapp');

    app.config(function ($mdThemingProvider) {

        $mdThemingProvider.theme('black')
            .primaryPalette('grey', {
                'default': '900', // by default use shade 900 from the grey palette for primary intentions

            });

        $mdThemingProvider.setDefaultTheme('black');

    });   

```

In this example, I defined a custom 'black' theme that uses primaryPalette (former primaryColor) with shade of 900 as the default primary intentions.

So you don't have to add .css by theme anymore (even the default-theme.css even if it ships with this version...)
