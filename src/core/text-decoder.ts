export class TextDecoder {
  /**
   * 不支持 UTF-8 code points 大于 1 字节
   * @see https://stackoverflow.com/questions/17191945/conversion-between-utf-8-arraybuffer-and-string
   * @param input
   */
  decode (input: ArrayBuffer | Uint8Array) {
    const uint8Array: Uint8Array = input instanceof ArrayBuffer ? new Uint8Array(input) : input;

    let s = '';

    for (let i = 0, il = uint8Array.length; i < il; i++) {
      s += String.fromCharCode(uint8Array[i]);
    }

    try {
      return decodeURIComponent(encodeURIComponent(s));
    } catch (_) {
      return s;
    }
  }
}
