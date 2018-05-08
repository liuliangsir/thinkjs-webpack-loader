/**
 * @file WebpackLoader 模块
 * @author liuliang(liuliang@w3ctech.com)
 */

import { loadConfig } from './configs';

/**
 * WebpackLoader 模块
 * @module thinkjs-webpack-loader
 * @exports WebpackLoader
 */
export default class WebpackLoader {
    /**
     * This will be an instance member, module:thinkjs-webpack-loader.WebpackLoader#viewFile
     * @memberof WebpackLoader.prototype
     * @public
    */
    viewFile;
    /**
     * This will be an instance member, module:thinkjs-webpack-loader.WebpackLoader#viewData
     * @memberof WebpackLoader#
     * @public
    */
    viewData;
    /**
     * This will be an instance member, module:thinkjs-webpack-loader.WebpackLoader#name
     * @memberof WebpackLoader
     * @instance
     * @public
    */
    name;
    /**
     * This will also be an instance member, module:thinkjs-webpack-loader.WebpackLoader#config
     * @memberof WebpackLoader.prototype
     * @public
     */
    config;
    /**
     * Create a webpackLoader
     * @param {string} viewFile - view file, an absolute file path
     * @param {Object} viewData - view data for render file
     * @param {string} name - the config name
     * @public
    */
    constructor(viewFile, viewData, name = 'default') {
        this.name = name;
    }
}
