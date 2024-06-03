export class ImageData {
  private w: number;
  private h: number;
  private d: Uint8ClampedArray;

  constructor () {
    const len = arguments.length;

    if (len == 2) {
      if (typeof arguments[0] == 'number' && typeof arguments[1] == 'number') {
        this.w = arguments[0];
        this.h = arguments[1];
        this.d = new Uint8ClampedArray(this.w * this.h * 4);

        return;
      }
    } else if (len == 3) {
      if (typeof arguments[0] == 'object' && typeof arguments[1] == 'number' && typeof arguments[2] == 'number') {
        this.d = arguments[0];
        this.w = arguments[1];
        this.h = arguments[2];
      }
    }
    throw new Error('ImageData: params error');
  }

  get width (): number {
    return this.w;
  }

  get height (): number {
    return this.h;
  }

  get data (): Uint8ClampedArray {
    return this.d;
  }
}
