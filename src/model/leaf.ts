import { Node } from './node';

export class Leaf extends Node {
  get length() {
    return 1;
  }
}

export function isLeaf(val: any): val is Leaf {
  return val instanceof Leaf;
}
