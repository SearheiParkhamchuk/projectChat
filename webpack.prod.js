const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: [
    './index.js',
  ],
  output: {
    filename: './js/bundle.js',
    path: resolve(__dirname, 'assets'),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }],
              'react',
              'stage-1',
            ],
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: {
            loader: "css-loader",
            options: {
              minimize: true
            }
          },
//          use: 'css-loader',
        })
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('./css/styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
};
