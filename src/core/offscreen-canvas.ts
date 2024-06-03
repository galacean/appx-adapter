import { platform } from './platform';
import { isMiniGame } from './register';

// 会导致蒙版失效，暂时不进行 Adapter 操作
export class _OffscreenCanvas {
  constructor (width = 0, height = 0) {
    let canvas;

    if (isMiniGame()) {
      canvas = platform.createCanvas();
      canvas.width = width;
      canvas.height = height;
    } else {
      canvas = platform.createOffscreenCanvas({ width, height });
    }

    return canvas;
  }
}
