"use strict";
const webpack = require('webpack');
const path = require('path');
const rules = require('./webpack.rules');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3141";


module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/styleguide.js' // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    path: path.join(__dirname, 'style'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules
  },
  devServer: {
    contentBase: "./style",
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoErrorsPlugin(), 
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
      classList: 'imports-loader?this=>global!classlist-polyfill'
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html'
    })
  ]
};
