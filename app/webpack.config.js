var path = require('path');
var webpack = require('webpack');
var proxy = require('http-proxy-middleware');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

var cataloguingProxy = proxy('/cataloguing', {
  target: 'http://localhost:8080',
  logLevel: 'debug'
});

var merchandisingProxy = proxy('/merchandising', {
  target: 'http://localhost:8080',
  logLevel: 'debug'
});

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/main/js/main.js')
    ]
  },
  devtool: 'source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'build/dist'),
    publicPath: './dist/',
    filename: 'bundle.js'
  },
  watch: true,
  plugins: [
    definePlugin,
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      open: true,
      middleware: [cataloguingProxy, merchandisingProxy],
      server: {
        baseDir: ['./src/test/js', './build']
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'file'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
};
