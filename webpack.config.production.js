const path = require('path')
const ClosureCompilerPlugin = require('webpack-closure-compiler')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./webpack.config')


config.devtool = false
config.output.path = path.resolve(__dirname, 'peterhudec.github.io')
config.plugins = [
  new ClosureCompilerPlugin({
    compiler: {
      language_in: 'ECMASCRIPT6',
      language_out: 'ECMASCRIPT5',
      output_wrapper:
        "/**\n" +
        " * If you are curious you can see the source at:\n" +
        " * https://github.com/peterhudec/peterhudec\n" +
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
      conservativeCollapse: true,
      customAttrCollapse: /(content|d)/,
      minifyCSS: true,
    },
  })
]


module.exports = config
