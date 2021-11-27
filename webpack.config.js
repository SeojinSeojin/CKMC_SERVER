const path = require('path');
const webpack = require('webpack');
const { NODE_ENV = 'production' } = process.env;
require('dotenv').config();

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: {
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MY_CONFIGS: JSON.stringify(process.env.MY_CONFIGS),
      },
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: NODE_ENV,
      MONGODB_URI: process.env.MONGODB_URI,
      MONGODB_DB: process.env.MONGODB_DB,
      SESSION_SECRET: process.env.SESSION_SECRET,
      HASH_ROUNDS: process.env.HASH_ROUNDS,
    }),
  ],
};
