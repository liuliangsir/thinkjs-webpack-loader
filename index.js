
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
   * Create a webpackLoader
   * @param {string} viewFile - view file, an absolute file path
   * @param {Object} viewData - view data for render file
   * @param {Object} config - the config
   * @public
   */
  constructor(viewFile, viewData, config) {
    super(viewFile, viewData, config);
  }
  /**
   *
   * render view file
   * @memberof WebpackLoader
   * @instance
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
    let options = void 0;
    if (viewFile.indexOf(viewPath)) {
      path = rest;
    } else {
      path = viewPath;
      options = rest;
    }

    const env = nunjucks.configure(path, options);
    env.addExtension('custom', new RenderExtension(config));

    const fn = helper.promisify(env.render, env);
    return fn(viewFile, this.viewData);
  }
}
