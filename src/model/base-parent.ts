import { Node } from './node';

export class BaseParentNode extends Node {
  children: Node[] = [];

  constructor(public parent: BaseParentNode | null) {
    super(parent);
  }

  append(node: Node) {
    this.children.push(node);
  }

  toJSON() {
    return {
      children: this.children.map((node) => node.toJSON()),
    };
  }
}

export function isBaseParentNode(val: any): val is BaseParentNode {
  return val instanceof BaseParentNode;
}
