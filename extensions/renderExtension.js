/**
 * @file RenderExtension 模块
 * @author liuliang(liuliang@w3ctech.com)
 */

import Tag from 'nunjucks-tag';
import {
    fileLoaderFactory
} from '../utils';

/**
 * RenderExtension 模块
 * @module module:renderExtension
 * @exports module:renderExtension.RenderExtension
 */
export default class RenderExtension extends Tag {
    constructor() {
        super('custom');
    }
    render(context, attrs, body) {
        // render before
        return super.render(context, attrs, body);
    }
}
