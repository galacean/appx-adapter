import { platform } from '../core/platform';

platform.createCanvas = wx.createCanvas;
platform.createImage = (wx as unknown as WechatMiniprogram.Canvas).createImage;
platform.createOffscreenCanvas = wx.createOffscreenCanvas;
platform.createSelectorQuery = (wx as unknown as WechatMiniprogram.Wx).createSelectorQuery;
platform.getSystemInfoSync = (wx as unknown as WechatMiniprogram.Wx).getSystemInfoSync;
platform.request = (wx as unknown as WechatMiniprogram.Wx).request;
platform.createVideoContext = (wx as unknown as WechatMiniprogram.Wx).createVideoContext;
platform.downloadFile = (wx as unknown as WechatMiniprogram.Wx).downloadFile;
platform.startDeviceMotionListening = (wx as unknown as WechatMiniprogram.Wx).startDeviceMotionListening;
platform.stopDeviceMotionListening = (wx as unknown as WechatMiniprogram.Wx).stopDeviceMotionListening;
platform.onDeviceMotionChange = (wx as unknown as WechatMiniprogram.Wx).onDeviceMotionChange;
platform.offDeviceMotionChange = (wx as unknown as WechatMiniprogram.Wx).offDeviceMotionChange;
