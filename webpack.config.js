const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
module.exports = {  
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
  	path: __dirname,
    filename: 'port_scanner.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
  	loaders: [{
  			test: /\.js$/,
  			exclude: /node_modules/,
        loader: 'babel-loader'
  		}]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ],
  resolve: {
  	modules: [
  		path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
  	]
  }
};