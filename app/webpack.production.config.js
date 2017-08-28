var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
});

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/main/js/main.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build/resources/main/static/js'),
    publicPath: './js/',
    filename: 'bundle-[hash].js'
  },
  plugins: [
    definePlugin,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: 'src/main/js/index.template.ejs',
      inject: 'body',
      filename: path.join(__dirname, 'build/resources/main/templates/index.ftl')
    })
  ],
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json'},
      {test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'src/main/js')},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.scss$/, loaders: ['style', 'css', 'sass']}
    ]
  },
  node: {
    fs: 'empty'
  }
};
