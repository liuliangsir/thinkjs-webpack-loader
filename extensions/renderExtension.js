/**
 * @file RenderExtension 模块
 * @author liuliang(liuliang@w3ctech.com)
 */

import Tag from 'nunjucks-tag';
import fileLoaderFactory from '../utils/fileLoaderFactory';
import {
  tag
} from '../configs';

const {
  map
} = tag;

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
    // initial config
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
  async render(context, attrs, body) {
    const newAttrs = await this.attrsFilter(attrs);
    // TODO fix the awful async problem
    return super.render(context, newAttrs, body);
  }
  tagNameCreator(attrs) {
    let realIndex = -1;
    let tagName = '';

    for (let i = 0, length = attrs.length; i < length; i++) {
      if (map[attrs[i]]) {
        tagName = map[attrs[i]]['name'];
        realIndex = i;
        break;
      }
    }

    // take full advantage of map
    if (realIndex < 0) {
      tagName = map['']['name'];
    }

    this.nodeName = tagName;
    return realIndex;
  }
  async attrsFilter(attrs) {
    const [bundleName, extension, groupName, attr] = attrs;
    const tagNameIndex = this.tagNameCreator(attrs);

    const newConfig = {
      baseConfig: this.config,
      groupName
    };

    if (tagNameIndex > -1) {
      attrs = attrs.filter((attr, index) => index !== tagNameIndex);
    }

    const [newAttr] = await fileLoaderFactory.getAttrs(bundleName, extension, newConfig, attr);
    if (
      extension &&
      map[extension]['attr']
    ) {
      attrs.push(`${map[extension]['attr']} = ${newAttr}`);
    }

    return attrs.filter(attr => ![bundleName, groupName].some(name => name === attr));
  }
}
