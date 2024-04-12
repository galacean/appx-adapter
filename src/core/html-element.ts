import * as Mixin from './utils/mixin';
import { noop } from './utils/noop';
import { Element } from './element';

export class HTMLElement extends Element {
  focus: any;
  blur: any;
  insertBefore: any;
  override appendChild: any;
  override removeChild: any;
  remove: any;
  innerHTML: string;
  tagName: string;

  constructor (tagName = '', level?: number) {
    super();

    this.className = '';
    this.children = [];

    this.focus = noop;
    this.blur = noop;

    this.insertBefore = noop;
    this.appendChild = noop;
    this.removeChild = noop;
    this.remove = noop;

    this.innerHTML = '';

    this.tagName = tagName.toUpperCase();

    Mixin.parentNode(this, level);
    Mixin.style(this);
    Mixin.classList(this);
    Mixin.clientRegion(this);
    Mixin.offsetRegion(this);
    Mixin.scrollRegion(this);
  }
}

Object.defineProperty(HTMLElement, Symbol.hasInstance, {
  value: function (instance: any) {
    return instance?.tagName === 'BODY';
  },
});
