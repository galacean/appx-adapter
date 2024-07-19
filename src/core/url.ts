import { btoa } from './atob';
import type { Blob } from './blob';

export class URL {
  /**
   * fake createObject, use base64 instead
   * @param blob
   */
  static createObjectURL (blob: Blob) {
    const buffer = blob.buffers[0];
    const type = typeof blob.type === 'object' ? (blob.type as { type: string }).type : blob.type;
    const base64 = _arrayBufferToBase64(buffer);
    const prefix = `data:${type};base64,`;

    return prefix + base64;
  }

  public href: string;

  // todo: 完善URL对象
  constructor (url: string, host = '') {
    // 如果 URL 是绝对的，则直接使用它
    if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) {
      this.href = url;

      return;
    }
    // 如果是相对地址
    // 移除基础 URL 的文件名部分（如果有）
    host = host.substring(0, host.lastIndexOf('/') + 1);
    // 移除相对 URL 的 "./" 部分（如果有）
    url = url.startsWith('./') ? url.substring(2) : url;

    // 拼接两个部分以构建绝对 URL
    this.href = host + url;
  }

  static revokeObjectURL () {

  }
}

function _arrayBufferToBase64 (buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}
