import type { Event } from './event';
import { HTMLElement } from './html-element';
import { document } from './document';

class Body extends HTMLElement {
  constructor () {
    // 为了性能, 此处不按照标准的DOM层级关系设计
    // 将 body 设置为 0级, parent元素为null
    super('body', 0);
  }

  override addEventListener (type: string, listener: () => void, options = {}) {
    document.addEventListener(type, listener, options);
  }

  override removeEventListener (type: string, listener: () => void) {
    document.removeEventListener(type, listener);
  }

  override dispatchEvent (event: Event) {
    document.dispatchEvent(event);
  }
}

export { Body };
