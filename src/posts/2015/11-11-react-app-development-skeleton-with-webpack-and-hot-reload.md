---
date: "2015-11-11T16:51:59Z"
title: "React app development skeleton with webpack and hot reload"
categories: ["javascript"]
tags: ["react"]
excerpt: "This article describes a development stack with React and webpack to develop with your favorite cod..."
---

This article describes a development stack with React and webpack to develop with your favorite code editor.

<details><summary>Prerequisites</summary>

<section>You should have [node.js](https://nodejs.org/en/) installed on your machine.</section>

</details>

## the short story:

```

>git clone https://github.com/CedricDumont/Learn-React.git

...
>cd Learn-React
>npm install
..
>npm link webpack-dev-server --save-dev
>node dev-server

```

navigate with your browser to : http://localhost:8080/

you should see `"hello react"` printed
then in an editor (notepad) change the ./src/App.jsx to return something new ("hello world")
save the file
you should see `"hello world"` replaced without reloading the page

set a `debugger;` expression (for chrome) in the code and go to the browser, => you can now debug with the dev tools of chrome for example.

## the longstory:

##### Create a repo on github (you should always do so... aren't you) clone it and npm init

```

>git clone https://yourrepopath/yourporject.git

>npm init

..answer the questions

```

##### Install webpack react and dependencies to enable es6 features

```

>npm install webpack babel-loader babel-core babel-preset-es2015 --save-dev

>npm install react react-dom --save

>npm install babel-preset-react --save-dev

```

##### configure webpack for dev and debugging:

**first install webpack-dev-server and react-hot-loader like so:**

```

>npm install  web-pack-dev-server -g
...
>npm install react-hot-loader --save-dev

```

**second create the config files**

_webpack.config.js_

[code language="javascript"]
var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval-source-map',
	entry: {
		main: [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
			'./src/main.jsx'
		]
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, "public"),
		publicPath: '/public/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				include: path.join(__dirname, 'src'),
				loader: 'react-hot!babel'
			}
		]
	}
}
[/code]

_.babelrc_
[code language="javascript"]
{
	presets: ['es2015', 'react']
}
[/code]

_dev-server.js_

```

var WebPackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var webpack = require('webpack');

new WebPackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback : true
}).listen(8080, 'localhost');
```

**start the server**

```

>npm link webpack-dev-server --save-dev  //this is done only one time

>node dev-server.js

```

That's it, now you can code react components and changes to them are automatically reloaded to the browser.
Check the full code [here](https://github.com/CedricDumont/Learn-React)

<details><summary>More info</summary>

<section>
For more info : check this [devtools](https://webpack.github.io/docs/configuration.html#devtool) and for hot loader, check this [React Hot Loader Config](http://gaearon.github.io/react-hot-loader/getstarted/)</section>

</details>

[back to top](#top)