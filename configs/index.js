/**
 * @file Config 模块
 * @author liuliang(liuliang@w3ctech.com)
 * @module config
 */

import findConfig from 'find-config';
import helper from 'think-helper';

/**
 * default config module:config~defaultConfig
 * @constant
 * @var {Object} defaultConfig
 * @default
 * @inner
 */
const defaultConfig = {
    'default': {
        cache: false,
        bundleDirName: 'webpackBundles/',
        statsFile: 'webpack-stats.json',
        pollInterval: 0.1,
        timeout: false,
        ignore: ['.hot-update.js', '.map']
    }
};

/**
 * name of the configuration file to find module: config~defaultConfigName
 * @constant {string}
 * @default
 * @inner
 */
const defaultConfigName = '.thinkjs-webpack-loader-config.js';

/**
 * creator of user config module: config~userConfigCreator
 * @function
 * @name userConfigCreator
 * @return {Object} resulting user config
 * @inner
 */
const userConfigCreator = () => {
    const config = findConfig.require(defaultConfigName, {
        home: false
    });

    if (config) {
        return config;
    }

    // fallback to locating it using the config block in the nearest package.json
    let pkg = findConfig('package.json', {
        home: false
    });

    if (pkg) {
        const pkgDir = path.dirname(pkg);
        pkg = require(pkg);

        if (pkg.config
            && pkg.config['thinkjs-webpack-loader']
            && pkg.config['thinkjs-webpack-loader'].config
        ) {
            // resolve relative to discovered package.json
            const pkgPath = path.resolve(pkgDir, pkg.config['cz-customizable'].config);
            return require(pkgPath);
        }
    }

}

/**
 * user config module:config~userConfig
 * @constant
 * @type {Object}
 * @default
 * @inner
 */
const userConfig = helper.extend({}, defaultConfig, userConfigCreator() || {});

/**
 * export resulting config module:config~userConfig
 * @function loadConfig
 * @param {string} name - the field name of userConfig
 * @return {string} resulting config
 * @public
 */
const loadConfig = (name) => userConfig[name];

export {
    loadConfig
};
