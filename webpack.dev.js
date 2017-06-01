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
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: resolve(__dirname, './'),
    publicPath: '/assets'
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
          use: 'css-loader',
        })
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('./css/styles.css'),
  ],
};
