import type { Event } from '../event';
import { document } from '../document';

// class MouseEvent extends Event {
//   constructor (type: string) {
//     super(type);
//   }
// }

function eventHandlerFactory (type: string) {
  return (rawEvent: Event) => {
    rawEvent.type = type;
    document.dispatchEvent(rawEvent);
  };
}

const dispatchMouseDown = eventHandlerFactory('mousedown');
const dispatchMouseMove = eventHandlerFactory('mousemove');
const dispatchMouseUp = eventHandlerFactory('mouseup');

export { dispatchMouseDown, dispatchMouseMove, dispatchMouseUp };
