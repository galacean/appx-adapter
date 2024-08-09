import { HTMLImageElement } from './constructor';
import { platform } from './platform';
import { getCanvas, isMiniGame } from './register';

export class Image extends HTMLImageElement {
  image: any;

  constructor () {
    super();

    if (isMiniGame()) {
      this.image = platform.createImage();
    } else {
      const canvas = getCanvas();

      this.image = canvas.createImage?.() ?? {};
    }

    this.image.constructor = Image;

    return this.image;
  }
}
