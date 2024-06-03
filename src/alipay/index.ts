export * from '../core';
import {
  platform,
  atob,
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

platform.createCanvas = my.createCanvas;
platform.createImage = my.createImage;
platform.createOffscreenCanvas = my.createOffscreenCanvas;
platform.createSelectorQuery = my.createSelectorQuery;
platform.getSystemInfoSync = my.getSystemInfoSync;
platform.request = my.request;
platform.startDeviceMotionListening = my.startDeviceMotionListening;
platform.stopDeviceMotionListening = my.stopDeviceMotionListening;
platform.onDeviceMotionChange = my.onDeviceMotionChange;
platform.offDeviceMotionChange = my.offDeviceMotionChange;
