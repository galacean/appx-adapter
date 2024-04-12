import { document } from '../document';
import { Event } from '../event';
import { getCanvas } from '../register';

class TouchEvent extends Event {
  touches: Touch[];
  targetTouches: Touch[];
  changedTouches: Touch[];

  constructor (type: string) {
    super(type);

    this.touches = [];
    this.targetTouches = [];
    this.changedTouches = [];

    this.target = getCanvas();
    this.currentTarget = getCanvas();
  }
}

function mapEvent (event: any) {
  const { x = 0, y = 0, clientX = 0, clientY = 0 } = event || {};

  // 小程序不支持Object.hasOwnProperty
  // (抹平不同的view事件)[https://docs.alipay.com/mini/framework/event-object]
  if (Object.keys(event).includes('x')) {
    event.pageX = event.clientX = x;
    event.pageY = event.clientY = y;
  } else {
    event.x = clientX;
    event.y = clientY;
  }
}

function eventHandlerFactory (type: string) {
  return (rawEvent: TouchEvent) => {
    const event = new TouchEvent(type);

    event.changedTouches = rawEvent.changedTouches || rawEvent.touches;
    event.touches = rawEvent.touches;
    event.targetTouches = Array.prototype.slice.call(rawEvent.touches);
    event.timeStamp = rawEvent.timeStamp;

    event.changedTouches.forEach(e => mapEvent(e));
    event.touches.forEach(e => mapEvent(e));
    event.targetTouches.forEach(e => mapEvent(e));

    document.dispatchEvent(event);
  };
}

const dispatchTouchStart = eventHandlerFactory('touchstart');
const dispatchTouchMove = eventHandlerFactory('touchmove');
const dispatchTouchEnd = eventHandlerFactory('touchend');
const dispatchTouchCancel = eventHandlerFactory('touchcancel');

export { dispatchTouchStart, dispatchTouchMove, dispatchTouchEnd, dispatchTouchCancel };
