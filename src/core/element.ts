import { Node } from './node';

export class Element extends Node {
  className: string;
  children: Element[];

  [props: string]: any;

  constructor () {
    super();

    this.className = '';
    this.children = [];
  }

  setAttribute (name: string, value: string) {
    this[name] = value;
  }

  getAttribute (name: string) {
    return this[name];
  }

  setAttributeNS (name: string, value: string) {
    this[name] = value;
  }

  getAttributeNS (name: string) {
    return this[name];
  }
}
