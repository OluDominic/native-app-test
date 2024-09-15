const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.js', // Adjust if your entry point is different
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['module:metro-react-native-babel-preset'],
        },
      },
    ],
  },
};
