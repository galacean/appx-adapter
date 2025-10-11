import { platform } from '../core/platform';

const wxSystemInfoSync = (() => {
  let cachedInfo: Partial<WechatMiniprogram.SystemInfo> | null = null;

  return () => {
    if (cachedInfo) {
      return cachedInfo;
    }

    // @ts-expect-error
    const { pixelRatio, screenHeight, screenWidth, windowHeight, windowWidth } = wx.getWindowInfo();
    // @ts-expect-error
    const { system, platform } = wx.getDeviceInfo();
    // @ts-expect-error
    const { language } = wx.getAppBaseInfo();

    cachedInfo = {
      pixelRatio,
      system,
      platform,
      language,
      screenWidth,
      screenHeight,
      windowWidth,
      windowHeight,
    };

    return cachedInfo;
  };
})();

platform.createCanvas = wx.createCanvas;
platform.createImage = (wx as unknown as WechatMiniprogram.Canvas).createImage;
platform.createOffscreenCanvas = wx.createOffscreenCanvas;
platform.createSelectorQuery = (wx as unknown as WechatMiniprogram.Wx).createSelectorQuery;
platform.getSystemInfoSync = wxSystemInfoSync;
platform.request = (wx as unknown as WechatMiniprogram.Wx).request;
platform.createVideoContext = (wx as unknown as WechatMiniprogram.Wx).createVideoContext;
platform.downloadFile = (wx as unknown as WechatMiniprogram.Wx).downloadFile;
platform.startDeviceMotionListening = (wx as unknown as WechatMiniprogram.Wx).startDeviceMotionListening;
platform.stopDeviceMotionListening = (wx as unknown as WechatMiniprogram.Wx).stopDeviceMotionListening;
platform.onDeviceMotionChange = (wx as unknown as WechatMiniprogram.Wx).onDeviceMotionChange;
platform.offDeviceMotionChange = (wx as unknown as WechatMiniprogram.Wx).offDeviceMotionChange;
platform.getFileSystemManager = (wx as unknown as WechatMiniprogram.Wx).getFileSystemManager;
