"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var Tag=_interopDefault(require("nunjucks-tag")),ViewNunjucks=_interopDefault(require("think-view-nunjucks")),nunjucks=_interopDefault(require("nunjucks")),helper=_interopDefault(require("think-helper"));class RenderExtension extends Tag{constructor(){super("custom")}render(e,n,r){return super.render(e,n,r)}}class WebpackLoader extends ViewNunjucks{constructor(e,n,r){super(e,n,r)}render(){const e=this.viewFile,n=this.handleOptions,r=this.config,t=(void 0===r?{}:r).viewPath;let u="",i=void 0;e.indexOf(t)?u=n:(u=t,i=n);const s=nunjucks.configure(u,i);return s.addExtension("custom",new RenderExtension),helper.promisify(s.render,s)(e,this.viewData)}}exports.default=WebpackLoader;