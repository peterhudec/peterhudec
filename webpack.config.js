const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015"],
          cacheDirectory: true,
        },
      },
    ],
  },
}
