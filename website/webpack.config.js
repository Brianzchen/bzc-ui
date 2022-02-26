// @flow
const path = require('path');

/*::
import type { WebpackOptions } from 'webpack';
*/

const { NODE_ENV } = process.env;

module.exports = ({
  mode: NODE_ENV === 'production' ? 'production' : 'development',
  entry: './website/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
    alias: {
      starfall: path.resolve(__dirname, '..', 'src', 'index.js'),
      pkgJson: path.resolve(__dirname, '..', 'package.json'),
    },
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    port: 3000,
    open: true,
    static: {
      directory: path.resolve(__dirname),
    },
  },
}/*: WebpackOptions */);
