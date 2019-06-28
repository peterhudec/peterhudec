# My Personal Website ([peterhudec.com](http://peterhudec.com))

This is the source code of my personal website
[peterhudec.com](http://peterhudec.com).
It's a static web page written in ES6 JavaScript.
It uses the [Three.js](https://threejs.org/) library for the 3d effects.
There are two renderers:
`TREE.WebGLRenderer` renders the logo with the scroll prompt and
`TREE.CSS3DRenderer` renders the textual content loaded from `index.html`,
so that it can be selectable and responsive.
The app is built with [Webpack](https://webpack.github.io/).

## Usage

There are three NPM commands:

* `npm start` Starts the
  [Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html).
* `npm run build` Builds the development version.
* `npm run production` Builds the production version with
  [Closure Compiler](https://developers.google.com/closure/compiler/).
* `npm run deploy` Builds the production version and deploys it by commiting
  it to the `master` branch of the
  [peterhudec.github.io](https://github.com/peterhudec/peterhudec.github.io)
  repository which is my GitHub
  [user page](https://help.github.com/en/articles/user-organization-and-project-pages#user-and-organization-pages-sites).