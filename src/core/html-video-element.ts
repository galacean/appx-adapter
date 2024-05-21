import { HTMLMediaElement } from './html-media-element';
import { platform } from './platform';

export class HTMLVideoElement extends HTMLMediaElement {
  srcObject: any;

  constructor () {
    super('video');
  }

  set src (url: string) {
    platform.downloadFile({
      url,
      success () {
        this.dispatchEvent(new Event('loadeddata'));
      },
      fail () {
        this.dispatchEvent(new Event('error'));
      },
    });
  }

}
