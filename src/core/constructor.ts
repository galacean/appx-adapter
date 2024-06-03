import { HTMLElement } from './html-element';
import { HTMLMediaElement } from './html-media-element';

export class HTMLImageElement extends HTMLElement {
  constructor () {
    super('img');
  }
}

// eslint-disable-next-line compat/compat
Object.defineProperty(HTMLImageElement, Symbol.hasInstance, {
  value: function (instance: any) {
    return instance?.tagName === 'IMG' || instance?.crossOrigin;
  },
});

export class HTMLCanvasElement extends HTMLElement {
  constructor () {
    super('canvas');
  }
}

export class HTMLAudioElement extends HTMLMediaElement {
  constructor () {
    super('audio');
  }
}
