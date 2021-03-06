var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  context: __dirname + "",
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/js/scripts.js",
  output: {
    path: path.join(__dirname, './src/js'),
    publicPath: "./src/js",
    filename: "client.min.js"
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /(node_modules|bower_components)/, 
        loader: "babel-loader",
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        } 
      }
    ]
  },
  devServer:{
    contentBase: __dirname,
    historyApiFallback: true
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
};