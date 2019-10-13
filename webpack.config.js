const path = require('path');
const { BannerPlugin } = require('webpack');

const { NODE_ENV, FILE_NAME } = process.env;
const filename = `${FILE_NAME}${NODE_ENV === 'production' ? '.min' : ''}.js`;

module.exports = {
  mode: NODE_ENV || 'development',
  devtool: 'source-map',
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename,
    libraryTarget: 'umd',
  },
  module: {
    rules: [],
  },
  plugins: [
    new BannerPlugin({
      banner: 'Author: Gabriel Koo\nProject: https://gabrielkoo.github.io/json-ld-breadcrumb/',
    }),
  ],
};
