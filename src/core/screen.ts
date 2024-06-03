import { platform } from './platform';

const { screenWidth, screenHeight, windowWidth, windowHeight } = platform.getSystemInfoSync();

export const screen = {
  width: screenWidth,
  height: screenHeight,
  availWidth: windowWidth,
  availHeight: windowHeight,
  availLeft: 0,
  availTop: 0,
};
