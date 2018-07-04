/**
 * @file FileLoaderFactory 模块
 * @author liuliang(liuliang@w3ctech.com)
 */

import {
    fileLoader as FileLoader
} from '../loaders';

/** @namespace loader */
const loader = {

};

/**
 * FileLoaderFactory 模块
 * @module module:fileLoaderFactory
 * @exports module:fileLoaderFactory.FileLoaderFactory
 */
class FileLoaderFactory {
    /**
     * get loader instance using name
     * @param {string} configName - the filed name of literal object
     * @returns {FileLoader}
     * @memberof FileLoaderFactory
     * @instance
     * @public
     * @see module:fileLoader
     */
    getLoader(configName) {
        if (!loader[configName]) {
            loader[configName] = new FileLoader(configName);
        }
        return loader[configName];
    }
    /**
     * get bundled file using bundleName and config
     * @param {string} bundleName - the name of bundle
     * @param {string} extension - the filename extension
     * @param {string} config - the field name of literal object
     * @returns {Object}
     * @memberof FileLoaderFactory.prototype
     * @public
     */
    getBundle(bundleName, extension, config) {
        let bundle = this.getLoader(config).getBundle();
        if (extension) {
            bundle = this.bundleFilter(bundle, extension);
        }
        return bundle;
    /**
     * the filter using extension for bundle
     * @param {Object} bundle
     * @param {string} extension - the filename extension
     * @returns {Object}
     * @memberof FileLoaderFactory#
     * @public
     */
    bundleFilter(bundle, extension) {

    }
}

export default new fileLoaderFactory;
