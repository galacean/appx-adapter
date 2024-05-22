import { platform as mpPlatform } from './platform';

const info = mpPlatform.getSystemInfoSync();
const { platform, language } = info;
const android = platform.toLowerCase().includes('android');
const uaDesc = android ? 'Android; CPU Android 6.0' : 'iPhone; CPU iPhone OS 10_3_1 like Mac OS X';
const ua = `Mozilla/5.0 (${uaDesc}) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 MiniGame NetType/WIFI Language/${language}`;
// @ts-expect-error
const miniProgram = (info.app && info.app === 'alipay') ? 'alipay' : 'wechat';

export const navigator = {
  platform,
  language: language,
  appVersion: `5.0 (${uaDesc}) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1`,
  userAgent: ua,
  miniProgram,
};
