export const platform = {
  getSystemInfoSync: () => {
    return {
      pixelRatio: 1,
      system: '',
      platform: '',
      language: '',
      screenWidth: 1,
      screenHeight: 1,
      windowWidth: 1,
      windowHeight: 1,
    } as Partial<WechatMiniprogram.SystemInfo>;
  },
  createCanvas: () => {
    return {
      addEventListener: (type: string, listener: () => void, options = {}) => { },
      removeEventListener: (type: string, listener: () => void) => { },
      dispatchEvent: (event: any) => { },
      width: 0,
      height: 0,
    };
  },
  createOffscreenCanvas: (options: { width?: number, height?: number, type?: string }) => {
    return {
      addEventListener: (type: string, listener: () => void, options = {}) => { },
      removeEventListener: (type: string, listener: () => void) => { },
      dispatchEvent: (event: any) => { },
      width: 0,
      height: 0,
    };
  },
  createImage: () => { },
  createSelectorQuery: () => { },
  request: (object: any) => { },
  downloadFile: (options: any) => { },
  createVideoContext: (id: string) => { },
  startDeviceMotionListening: (object: any) => { },
  stopDeviceMotionListening: () => { },
  onDeviceMotionChange: (listener: (event: any) => void) => { },
  offDeviceMotionChange: (listener: (event: any) => void) => { },
  getFileSystemManager: () => { },
};
