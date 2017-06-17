'use strict';

/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./base');

class WebpackDevConfig extends WebpackBaseConfig {

  constructor() {
    super();

    console.log('Loading -DEV- Config.');

    this.config = {
      devtool: 'cheap-module-source-map',
      entry: [
        'webpack-dev-server/client?http://0.0.0.0:8000/',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './app.js'
      ],
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ]
    };
  }
}

module.exports = WebpackDevConfig;
