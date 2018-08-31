/**
 * @file Tag 模块
 * @author liuliang(liuliang@w3ctech.com)
 * @module module:tag
 * @exports module:tag.map
 */

/**
 * the mapping between an abbr of tagName and tagName
 * @namespace map
 */
const map = {
  '': {
    name: 'div',
    attr: ''
  },
  'js': {
    name: 'script',
    attr: 'src'
  },
  'css': {
    name: 'link',
    attr: 'href'
  },
};

export {
  map
};
