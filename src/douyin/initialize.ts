import { platform } from '../core/platform';

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
