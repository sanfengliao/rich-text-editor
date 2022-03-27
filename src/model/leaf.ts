import { Node } from "./node";

export class Leaf extends Node {

}

export function isLeaf(val: any): val is Leaf {
  return val instanceof Leaf;
}