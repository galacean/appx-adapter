export * from '../core';
import {
  platform, atob,
  btoa,
  document,
  navigator,
  location,
  performance,
  devicePixelRatio,
  screen,
  Blob,
  URL,
  Event,
  EventTarget,
  Node,
  Element,
  HTMLImageElement,
  HTMLCanvasElement,
  HTMLElement,
  HTMLMediaElement,
  HTMLAudioElement,
  HTMLVideoElement,
  Image,
  ImageData,
  requestAnimationFrame,
  cancelAnimationFrame,
  XMLHttpRequest,
  WebGLRenderingContext,
  WebGL2RenderingContext,
} from '../core';

export const window = {
  innerWidth: screen.availWidth,
  innerHeight: screen.availHeight,
  setTimeout,
  clearTimeout,
  atob,
  btoa,
  devicePixelRatio,
  document,
  navigator,
  location,
  screen,
  Blob,
  Event,
  EventTarget,
  Node,
  Element,
  HTMLElement,
  HTMLCanvasElement,
  HTMLImageElement,
  HTMLMediaElement,
  HTMLAudioElement,
  HTMLVideoElement,
  Image,
  ImageData,
  requestAnimationFrame,
  cancelAnimationFrame,
  XMLHttpRequest,
  performance,
  URL,
  WebGLRenderingContext,
  WebGL2RenderingContext,
  addEventListener (type: string, listener: () => void, options = {}) {
    document.addEventListener(type, listener, options);
  },
  removeEventListener (type: string, listener: () => void) {
    document.removeEventListener(type, listener);
  },
  dispatchEvent (event: Event) {
    document.dispatchEvent(event);
  },
};

platform.createCanvas = wx.createCanvas;
platform.createImage = (wx as unknown as WechatMiniprogram.Canvas).createImage;
platform.createOffscreenCanvas = wx.createOffscreenCanvas;
platform.createSelectorQuery = (wx as unknown as WechatMiniprogram.Wx).createSelectorQuery;
platform.getSystemInfoSync = (wx as unknown as WechatMiniprogram.Wx).getSystemInfoSync;
platform.request = (wx as unknown as WechatMiniprogram.Wx).request;
