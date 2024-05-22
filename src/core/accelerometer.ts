import { platform } from './platform';
import { document } from './document';

export class Accelerometer {

  handleDeviceMotionChange (event: any) {
    document.dispatchEvent({
      ...event,
      beta: - event.beta,
      type: 'deviceorientation',
    });
  }

  startWatch (interval?: 'game' | 'ui' | 'normal') {
    platform.startDeviceMotionListening({
      interval: interval || 'ui',
      success: () => {
        platform.onDeviceMotionChange(this.handleDeviceMotionChange);
      },
    });
  }

  stopWatch () {
    platform.offDeviceMotionChange(this.handleDeviceMotionChange);
  }
}
