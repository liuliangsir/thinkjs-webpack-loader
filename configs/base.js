/**
 * @file Base 模块
 * @author liuliang(liuliang@w3ctech.com)
 * @module module:base
 * @exports module:base.loadConfig
 */

import findConfig from 'find-config';
import helper from 'think-helper';

/**
 * default config module:base~defaultConfig
 * @constant
 * @member {Object} defaultConfig
 * @default
 * @inner
 */
const defaultConfig = {
  isDebug: false,
  isCache: true,
  bundleDirName: 'dist',
  statsFile: 'webpack-stats.json',
  pollInterval: 500,
  timeoutThreshold: 5000,
  ignores: ['.hot-update.js', '.map']
};

/**
 * name of the configuration file to find module:base~defaultConfigName
 * @constant {string}
 * @default
 * @inner
 */
const defaultConfigName = 'thinkjs-webpack-loader-config.js';

/**
 * creator of user config module:base~userConfigCreator
 * @function
 * @name userConfigCreator
 * @param {string} name - the name of group
 * @param {string} [env=development] - the symbol of current environment
 * @return {Object} resulting user config
 * @inner
 */
const userConfigCreator = (name, env = 'development') => {
  const config = findConfig.require(defaultConfigName, {
    home: false
  });

  if (
    config &&
    config[env] &&
    config[env][name]
  ) {
    return config[env][name];
  }

  // fallback to locating it using the config block in the nearest package.json
  let pkg = findConfig('package.json', {
    home: false
  });

  if (pkg) {
    pkg = require(pkg);

    if (
      pkg.config &&
      pkg.config['thinkjs-webpack-loader'] &&
      pkg.config['thinkjs-webpack-loader'].config
    ) {
      // resolve relative to discovered package.json
      const pkgPath = require.resolve(pkg.config['thinkjs-webpack-loader'].config);
      return require(pkgPath)[env][name];
    }
  }
};

/**
 * export resulting config module:base~userConfig
 * @function loadConfig
 * @param {string} name - the name of group
 * @param {string} env - the symbol of current environment
 * @return {string} resulting config
 * @public
 */
const loadConfig = (name, env) => helper.extend({}, defaultConfig, userConfigCreator(name, env) || {});

export {
  loadConfig
};
