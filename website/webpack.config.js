// @flow
const path = require('path');

const { NODE_ENV } = process.env;

module.exports = {
  mode: (NODE_ENV === 'production' ? 'production' : 'development'/*: string */),
  entry: './website/src/index.js',
  output: {
    filename: 'main.js',
    path: (path.resolve(__dirname, 'dist')/*: string */),
  },
  module: {
    rules: [
      {
        test: (/\.(js)$//*: RegExp */),
        exclude: (/node_modules//*: RegExp */),
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
};
