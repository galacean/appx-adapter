import { Event } from '../event';
import { getCanvas } from '../register';
import { document } from '../document';

class PointerEvent extends Event {
  buttons: number;
  which: number;
  offsetX: number;
  offsetY: number;
  pointerId: number;
  bubbles: boolean;
  button: number;
  width: number;
  height: number;
  pressure: number;
  isPrimary: boolean;
  pointerType: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;

  [props: string]: any;

  constructor (type: string) {
    super(type);

    this.target = getCanvas();
    this.currentTarget = getCanvas();
  }
}

const CLONE_PROPS = [
  // MouseEvent
  'bubbles',
  'cancelable',
  'view',
  'detail',
  'screenX',
  'screenY',
  'clientX',
  'clientY',
  'ctrlKey',
  'altKey',
  'shiftKey',
  'metaKey',
  'button',
  'relatedTarget',

  // PointerEvent
  'pointerId',
  'width',
  'height',
  'pressure',
  'tiltX',
  'tiltY',
  'pointerType',
  'hwTimestamp',
  'isPrimary',

  // event instance
  'pageX',
  'pageY',
  'timeStamp',
];

const CLONE_DEFAULTS = [
  // MouseEvent
  false,
  false,
  null,
  null,
  0,
  0,
  0,
  0,
  false,
  false,
  false,
  false,
  0,
  null,

  // DOM Level 3
  0,

  // PointerEvent
  0,
  0,
  0,
  0,
  0,
  0,
  '',
  0,
  false,

  // event instance
  0,
  0,
  0,
];

const POINTER_TYPE = 'touch';

function touchToPointer (type: string, touch: Touch) {
  const e = new PointerEvent(type);

  for (let i = 0; i < CLONE_PROPS.length; i++) {
    const p = CLONE_PROPS[i];

    e[p] = touch[p as keyof Touch] || CLONE_DEFAULTS[i];
  }
  e.type = type;
  e.target = getCanvas();
  e.currentTarget = getCanvas();
  e.buttons = typeToButtons(type);
  e.which = e.buttons;
  e.pointerId = (touch.identifier || 0) + 2;
  e.bubbles = true;
  e.cancelable = true; // e.detail = this.clickCount;
  e.button = 0;
  e.width = (touch.radiusX || 0.5) * 2;
  e.height = (touch.radiusY || 0.5) * 2;
  e.pressure = touch.force || 0.5;
  e.isPrimary = isPrimaryPointer(touch);
  e.pointerType = POINTER_TYPE; // forward modifier keys
  // @ts-expect-error
  e.offsetX = touch.pageX || touch.x;
  // @ts-expect-error
  e.offsetY = touch.pageY || touch.y;

  return e;
}

function typeToButtons (type: string) {
  let ret = 0;

  if (type === 'touchstart' || type === 'touchmove' || type === 'pointerdown' || type === 'pointermove') {
    ret = 1;
  }

  return ret;
}

let firstPointer: number | null = null;

function isPrimaryPointer (touch: Touch) {
  return firstPointer === touch.identifier;
}

function setPrimaryPointer (touch: Touch) {
  if (firstPointer === null) {
    firstPointer = touch.identifier;
  }
}

function removePrimaryPointer (touch: Touch) {
  if (firstPointer === touch.identifier) {
    firstPointer = null;
  }
}

function eventHandlerFactory (type: string) {
  return (rawEvent: TouchEvent) => {
    const changedTouches = rawEvent.changedTouches || rawEvent.touches;

    for (let i = 0; i < changedTouches.length; i++) {
      const touch = changedTouches[i];

      switch (type) {
        case 'pointerdown':
          i === 0 && setPrimaryPointer(touch);
          document.dispatchEvent(touchToPointer(type, touch));

          break;
        case 'pointermove':
          document.dispatchEvent(touchToPointer(type, touch));

          break;
        case 'pointerup':
          document.dispatchEvent(touchToPointer(type, touch));

          break;
        case 'pointerleave':
        case 'pointercancel':
          removePrimaryPointer(touch);
          document.dispatchEvent(touchToPointer(type, touch));

          break;
        default:
          break;
      }
    }
  };
}

const dispatchPointerDown = eventHandlerFactory('pointerdown');
const dispatchPointerMove = eventHandlerFactory('pointermove');
const dispatchPointerUp = eventHandlerFactory('pointerup');
const dispatchPointerLeave = eventHandlerFactory('pointerleave');
const dispatchPointerCancel = eventHandlerFactory('pointercancel');

export { dispatchPointerDown, dispatchPointerMove, dispatchPointerUp, dispatchPointerLeave, dispatchPointerCancel };
