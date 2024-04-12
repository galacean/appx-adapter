import { platform } from './platform';

export const { pixelRatio: devicePixelRatio } = platform.getSystemInfoSync();
