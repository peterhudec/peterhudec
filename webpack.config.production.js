var ClosureCompilerPlugin = require('webpack-closure-compiler')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = require('./webpack.config')


config.devtool = false
config.plugins = [
  new ClosureCompilerPlugin({
    compiler: {
      language_in: 'ECMASCRIPT6',
      language_out: 'ECMASCRIPT5',
      output_wrapper:
        "/**\n" +
        " * If you are curious you can see the source at\n" +
        " * https://github.com/peterhudec/peterhudec.com\n" +
        " */\n" +
        '%output%'
    },
    concurrency: 3,
  }),
  new HtmlWebpackPlugin({
    inject: false,
    template: 'index.html',
    minify: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      customAttrCollapse: /(content|d)/,
      minifyCSS: true,
    },
  })
]


module.exports = config
