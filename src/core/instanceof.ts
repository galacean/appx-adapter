// @ts-expect-error
const renderTarget = typeof my !== 'undefined' ? my.renderTarget : undefined;
const inMiniPlugin = renderTarget === 'web' && typeof getApp !== 'function';
const isGlobalConstructor = function (k: any): boolean {
  if (typeof k === 'function' && typeof k.name === 'string') {
    let gk;

    switch (k.name) {
      case 'Object': gk = Object;

        break;
      case 'Array': gk = Array;

        break;
      case 'String': gk = String;

        break;
      case 'Number': gk = Number;

        break;
      case 'Date': gk = Date;

        break;
      case 'Function': gk = Function;

        break;
      case 'Boolean': gk = Boolean;

        break;
      case 'ArrayBuffer': gk = typeof ArrayBuffer !== 'undefined' ? ArrayBuffer : undefined;

        break;
      case 'Promise': gk = typeof Promise !== 'undefined' ? Promise : undefined;

        break;
    }

    return gk === k;
  }

  return false;
};

export function isInstanceOf (a: any, b: any) {
  const result = a instanceof b;

  if (result) {
    return result;
  } else if (inMiniPlugin) {
    if (isGlobalConstructor(b)) {
      const aType = Object.prototype.toString.call(a);

      if (aType === '[object ' + b.name + ']') {
        return true;
      }
    }

    return result;
  }
}
