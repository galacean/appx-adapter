import { getCanvas } from './register';

let lastTime: any = 0;
let id: any = 0;

function hack (cb: (t: number) => void) {
  const now = Date.now();

  const nextTime = Math.max(lastTime + 23, now);

  id = setTimeout(() => {
    cb((lastTime = nextTime));
  }, nextTime - now);

  return id;
}

function requestAnimationFrame (cb: (t: number) => void) {
  const canvas = getCanvas();

  if (canvas.requestAnimationFrame) {
    return canvas.requestAnimationFrame(cb);
  } else {
    return hack(cb);
  }
}

function cancelAnimationFrame (id: number) {
  const canvas = getCanvas();

  if (canvas.cancelAnimationFrame) {
    return canvas.cancelAnimationFrame(id);
  } else {
    return clearTimeout(id);
  }
}

export { requestAnimationFrame, cancelAnimationFrame };
