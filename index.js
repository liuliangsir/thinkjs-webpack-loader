
/**
 * @file WebpackLoader 模块
 * @author liuliang(liuliang@w3ctech.com)
 */

import ViewNunjucks from 'think-view-nunjucks';
import nunjucks from 'nunjucks';
import helper from 'think-helper';
import { RenderExtension } from './extensions';

/**
 * WebpackLoader 模块
 * @module module:thinkjs-webpack-loader
 * @exports module:thinkjs-webpack-loader.WebpackLoader
 */
export default class WebpackLoader extends ViewNunjucks {
  /**
   * create a webpackLoader
   * @public
   * @param {string} viewFile - view file, an absolute file path
   * @param {Object} viewData - view data for render file
   * @param {Object} config - the config
   */
  constructor(viewFile, viewData, config) {
    super(viewFile, viewData, config);
  }
  /**
   *
   * render view file
   * @instance
   * @memberof WebpackLoader
   * @returns {Promise}
   * @public
   */
  render() {
    const {
      viewFile,
      handleOptions: {
        loader: config,
        ...rest
      },
      config: {
        viewPath
      } = {}
    } = this;

    let path = '';
    let option = void 0;
    if (viewFile.indexOf(viewPath)) {
      path = rest;
    } else {
      path = viewPath;
      option = rest;
    }

    const env = nunjucks.configure(path, option);
    env.addExtension('custom', new RenderExtension(config));

    const fn = helper.promisify(env.render, env);
    return fn(viewFile, this.viewData);
  }
}
