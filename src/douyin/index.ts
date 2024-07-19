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

export * from '../core';
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

platform.createCanvas = (tt as any).createCanvas;
platform.createImage = (tt as any).createImage;
platform.createOffscreenCanvas = (tt as any).createOffscreenCanvas;
platform.createSelectorQuery = tt.createSelectorQuery;
platform.getSystemInfoSync = (tt as any).getSystemInfoSync;
platform.request = tt.request;
platform.createVideoContext = tt.createVideoContext;
platform.downloadFile = tt.downloadFile;
platform.startDeviceMotionListening = (tt as any).startDeviceMotionListening;
platform.stopDeviceMotionListening = (tt as any).stopDeviceMotionListening;
platform.onDeviceMotionChange = (tt as any).onDeviceMotionChange;
platform.offDeviceMotionChange = (tt as any).offDeviceMotionChange;
