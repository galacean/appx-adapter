import { platform } from './platform';
import { document } from './document';

export class Accelerometer {

  handleDeviceMotionChange (event: any) {
    document.dispatchEvent({
      alpha: event.alpha,
      gamma: event.gamma,
      beta: -event.beta,
      type: 'deviceorientation',
    });
  }

  startWatch (interval: 'game' | 'ui' | 'normal' = 'ui') {
    platform.startDeviceMotionListening({
      interval,
      success: () => {
        platform.onDeviceMotionChange(this.handleDeviceMotionChange);
      },
    });
  }

  stopWatch () {
    platform.offDeviceMotionChange(this.handleDeviceMotionChange);
  }
}
