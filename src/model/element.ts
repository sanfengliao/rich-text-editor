import { Node } from './node'
export class Element extends Node {

  children: Node[] = []
  
  constructor(public parent: Element | null) {
    super(parent);
  }

  addNode(node: Node) {
    this.children.push(node);
  }

  toJSON() {
    return this.children.map(node => node.toJSON())
  }
}

export function isElement(val: any): val is Element {
  return val instanceof Element;
}