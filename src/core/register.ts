import { platform } from './platform';
import { document } from './document';
import * as Mixin from './utils/mixin';

/**
 *
 */
export interface registerCanvasOptions {
  /**
   * 组件或页面的 this 上下文，微信小程序组件需要传递
   */
  context?: any,
  /**
   * canvas 的 ID 或 canvas 对象
   */
  id?: unknown,
  /**
   * 是否为小游戏
   * @default false
   */
  isMiniGame?: boolean,
  /**
   * canvas 的层级
   * @default 0
   */
  elementLevel?: number,
}
// 同步和异步都需要的数据
let canvas: any = {};
let _isMiniGame = false;

/**
 * 异步注册 canvas
 * @param options
 * @returns
 */
export async function registerCanvas (options: registerCanvasOptions = {}) {
  const { id = 'J-canvas', isMiniGame = false, elementLevel = 0 } = options;

  if (typeof id === 'string') {
    if (isMiniGame) {
      canvas = platform.createCanvas();
    } else {
      canvas = await getCanvasById(id, options.context);
    }
  } else {
    canvas = id;
    canvas.id = id;
  }

  registerOffscreenCanvas(canvas, elementLevel);

  _isMiniGame = isMiniGame;

  return canvas;
}

/**
 * 异步注册 canvas
 * @param options
 * @returns
 */
export function registerOffscreenCanvas (canvas: any, elementLevel?: number) {
  if (!('tagName' in canvas)) {
    canvas.tagName = 'CANVAS';
  }

  canvas.type = 'canvas';
  canvas.width = canvas.width * 2;
  canvas.height = canvas.height * 2;

  Mixin.parentNode(canvas, elementLevel ?? 0);
  Mixin.style(canvas);
  Mixin.classList(canvas);
  Mixin.offsetRegion(canvas);

  canvas.focus = function () { };
  canvas.blur = function () { };

  canvas.addEventListener = function (type: string, listener: () => void, options = {}) {
    document.addEventListener(type, listener, options);
  };

  canvas.removeEventListener = function (type: string, listener: () => void) {
    document.removeEventListener(type, listener);
  };

  canvas.dispatchEvent = function (event: any) {
    document.dispatchEvent(event);
  };

  return canvas;
}

async function getCanvasById (id: string, context?: any) {
  return new Promise((resolve, reject) => {
    let query = platform.createSelectorQuery();

    if (context) {
      // @ts-expect-error
      query = query.in(context);
    }

    // @ts-expect-error
    query.select(id).node()
      .select(id).boundingClientRect()
      // @ts-expect-error
      .exec(res => {
        try {
          const canvas = res[0].node;
          const rect = res[1];

          if (canvas) {
            canvas.getBoundingClientRect = () => rect;
            resolve(canvas);
          } else {
            reject(`create canvas fail, canvas is ${canvas}`);
          }
        } catch (e) {
          reject(`Cannot find canvas by id: ${id}, ${e}`);
        }
      });
  });
}

/**
 * 获取 canvas
 * @returns
 */
export function getCanvas () {
  return canvas;
}

export function isMiniGame () {
  return _isMiniGame;
}
