import { screen } from '../screen';
import type { HTMLElement } from '../html-element';
import { document } from '../document';
import { noop } from './noop';

const { availWidth: innerWidth, availHeight: innerHeight } = screen;

export function parentNode (obj: HTMLElement, level?: number) {
  if (!('parentNode' in obj)) {
    let parent;

    if (level === 0) {
      parent = () => {
        return null;
      };
    } else if (level === 1) {
      parent = () => {
        return document.documentElement;
      };
    } else {
      parent = () => {
        return document.body;
      };
    }

    Object.defineProperty(obj, 'parentNode', {
      enumerable: true,
      get: parent,
    });
  }

  if (!('parentElement' in obj)) {
    let parent;

    if (level === 0) {
      parent = function () {
        return null;
      };
    } else if (level === 1) {
      parent = function () {
        return document.documentElement;
      };
    } else {
      parent = function () {
        return document.body;
      };
    }

    Object.defineProperty(obj, 'parentElement', {
      enumerable: true,
      get: parent,
    });
  }
}

export function style (obj: Record<string, any>) {
  obj.style = {
    ...(obj.style ?? {}),
    top: '0px',
    left: '0px',
    width: innerWidth + 'px',
    height: innerHeight + 'px',
    margin: '0px',
    padding: '0px',
  };
}

export function clientRegion (obj: Record<string, any>) {
  if (!('clientLeft' in obj)) {
    obj.clientLeft = 0;
    obj.clientTop = 0;
  }
  if (!('clientWidth' in obj)) {
    obj.clientWidth = innerWidth;
    obj.clientHeight = innerHeight;
  }

  if (!('getBoundingClientRect' in obj)) {
    obj.getBoundingClientRect = function () {
      return {
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        width: this.clientWidth,
        height: this.clientHeight,
        right: this.clientWidth,
        bottom: this.clientHeight,
      };
    };
  }
}

export function offsetRegion (obj: Record<string, any>) {
  if (!('offsetLeft' in obj)) {
    obj.offsetLeft = 0;
    obj.offsetTop = 0;
  }
  if (!('offsetWidth' in obj)) {
    obj.offsetWidth = innerWidth;
    obj.offsetHeight = innerHeight;
  }
}

export function scrollRegion (obj: Record<string, any>) {
  if (!('scrollLeft' in obj)) {
    obj.scrollLeft = 0;
    obj.scrollTop = 0;
  }
  if (!('scrollWidth' in obj)) {
    obj.scrollWidth = innerWidth;
    obj.scrollHeight = innerHeight;
  }
}

export function classList (obj: Record<string, any>) {
  obj.classList = [];
  obj.classList.add = noop;
  obj.classList.remove = noop;
  obj.classList.contains = noop;
  obj.classList.toggle = noop;
}
