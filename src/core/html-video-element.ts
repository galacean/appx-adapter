import { HTMLMediaElement } from './html-media-element';

export class HTMLVideoElement extends HTMLMediaElement {
  // srcObject: any;
  // videoContext: any;
  //
  constructor () {
    super('video');
    // this.videoContext = platform.createVideoContext('GEVideo');
  }
  //
  // override play() {
  //   this.videoContext.play();
  // }
  //
  // set src (url: string) {
  //   platform.downloadFile({
  //     url,
  //     success (res: any) {
  //       this.videoContext.src = res.apFilePath;
  //       this.dispatchEvent(new Event('loadeddata'));
  //     },
  //     fail (e: any) {
  //       this.dispatchEvent(new Event({
  //         type: 'error',
  //         e
  //       }));
  //     },
  //   });
  // }

}
