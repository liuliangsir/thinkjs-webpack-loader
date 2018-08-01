/**
 * @file RenderExtension 模块
 * @author liuliang(liuliang@w3ctech.com)
 */

import Tag from 'nunjucks-tag';
import fileLoaderFactory from '../utils/fileLoaderFactory';
import {
  tag
} from '../configs';

/**
 * RenderExtension 模块
 * @module module:renderExtension
 * @exports module:renderExtension.RenderExtension
 */
export default class RenderExtension extends Tag {
  /**
   * an instance member, module:renderExtension.RenderExtension#config
   * @memberof RenderExtension#
   * @public
   */
  config;
  /**
   * Create a RenderExtension
   * @param config - the config of object literal
   * @memberof RenderExtension
   * @instance
   * @public
   */
  constructor(config) {
    super('custom');
    // 初始化 config
    this.config = config;
  }
  /**
   * render html tag name by nunjucks tag package
   * @param {Object} context - context of nunjucks
   * @param {Object} context.ctx - locals
   * @param {Object} context.env - nunjucks environment
   * @param {(string[]|Object[])} attrs - parse from attributes, ['checked', 'readonly', ['a', 'b'], {a: 'b'}, {class: ["a"], alt: "bb", __keyword: true}]
   * @param {(string|Function)} body - child html content, could be string or function
   * @returns {string}
   */
  render(context, attrs, body) {
    return super.render(context, this.attrsFilter(attrs), body);
  }
  tagNameCreator(attrs) {
    let realIndex = -1;
    let tagName = '';

    const {
      map
    } = tag;

    for (let i = 0, length = attrs.length; i < length; i++) {
      if (map[attrs[i]]) {
        tagName = map[attrs[i]];
        realIndex = i;
        break;
      }
    }

    // take full advantage of map
    if (realIndex < 0) {
      tagName = map[''];
    }

    this.nodeName = tagName;
    return realIndex;
  }
  attrsFilter(attrs) {
    const [bundleName, extension, groupName, attr] = attrs;
    const tagNameIndex = this.tagNameCreator(attrs);

    const newConfig = {
      baseConfig: this.config,
      groupName
    };

    if (tagNameIndex > -1) {
      attrs = attrs.filter((attr, index) => index !== tagNameIndex);
    }

    return attrs;
  }
}
