import { platform } from './platform';
import { getCanvas, isMiniGame } from './register';

export class Image {
  constructor () {
    let image;

    if (isMiniGame()) {
      image = platform.createImage();
    } else {
      const canvas = getCanvas();

      image = canvas.createImage?.() ?? {};
    }

    return image;
  }
}
