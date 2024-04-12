import { platform } from './platform';
import { Body } from './body';
import type { Event } from './event';
import { HTMLElement } from './html-element';
import { HTMLVideoElement } from './html-video-element';
import { Image } from './image';
import { getCanvas, isMiniGame, registerCanvas, registerOffscreenCanvas } from './register';

class DocumentElement extends HTMLElement {
  constructor () {
    super('html', 0);
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

const events: Record<string, any> = {};

export const document: Record<string, any> = {
  readyState: 'complete',
  visibilityState: 'visible', // 'visible' , 'hidden'
  hidden: false,
  fullscreen: true,

  scripts: [],
  style: {},

  ontouchstart: null,
  ontouchmove: null,
  ontouchend: null,
  onvisibilitychange: null,

  parentNode: null,
  parentElement: null,
  head: null,
  body: null,
  documentElement: null,

  createElement (tagName: string) {
    tagName = tagName.toLowerCase();
    if (tagName === 'canvas') {
      if (isMiniGame()) {
        const canvas = platform.createCanvas();

        // 小游戏适配
        canvas.addEventListener = function (type: string, listener: () => void, options = {}) {
          document.addEventListener(type, listener, options);
        };
        canvas.removeEventListener = function (type: string, listener: () => void) {
          document.removeEventListener(type, listener);
        };
        canvas.dispatchEvent = function (event: any) {
          document.dispatchEvent(event);
        };

        return canvas;
      } else {
        const canvas = platform.createOffscreenCanvas({ type: '2d' });

        registerOffscreenCanvas(canvas);

        return canvas;
      }
    } else if (tagName === 'img') {
      return new Image();
    } else if (tagName === 'video') {
      return new HTMLVideoElement();
    }

    return new HTMLElement(tagName);
  },

  createElementNS (nameSpace: string, tagName: string) {
    return this.createElement(tagName);
  },

  createTextNode (text: string) {
    // TODO: Do we need the TextNode Class ???
    return text;
  },

  getElementById (id: string) {
    const canvas = getCanvas();

    if (id === canvas.id) {
      return canvas;
    } else {
      return null;
    }
  },

  getElementsByTagName (tagName: string) {
    tagName = tagName.toLowerCase();
    if (tagName === 'head') {
      return [document.head];
    } else if (tagName === 'body') {
      return [document.body];
    } else if (tagName === 'canvas') {
      return [getCanvas()];
    }

    return [];
  },

  getElementsByTagNameNS (nameSpace: string, tagName: string) {
    return this.getElementsByTagName(tagName);
  },

  getElementsByName (tagName: string) {
    if (tagName === 'head') {
      return [document.head];
    } else if (tagName === 'body') {
      return [document.body];
    } else if (tagName === 'canvas') {
      return [getCanvas()];
    }

    return [];
  },

  querySelector (query: string) {
    const canvas = getCanvas();

    if (query === 'head') {
      return document.head;
    } else if (query === 'body') {
      return document.body;
    } else if (query === 'canvas') {
      return canvas;
    } else if (query === `#${canvas.id}`) {
      return canvas;
    }

    return null;
  },

  querySelectorAll (query: string) {
    if (query === 'head') {
      return [document.head];
    } else if (query === 'body') {
      return [document.body];
    } else if (query === 'canvas') {
      return [getCanvas()];
    }

    return [];
  },

  addEventListener (type: string, listener: () => void, options: Record<string, any>) {
    if (!events[type]) {
      events[type] = [];
    }
    events[type].push(listener);
  },

  removeEventListener (type: string, listener: () => void) {
    const listeners = events[type];

    if (listeners && listeners.length > 0) {
      for (let i = listeners.length; i--; i > 0) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);

          break;
        }
      }
    }
  },

  dispatchEvent (event: Event) {
    const type = event.type;
    const listeners = events[type];

    if (listeners) {
      for (let i = 0; i < listeners.length; i++) {
        listeners[i](event);
      }
    }

    if (event.target && typeof event.target['on' + type] === 'function') {
      event.target['on' + type](event);
    }
  },
};

document.documentElement = new DocumentElement();
document.head = new HTMLElement('head');
document.body = new Body();
