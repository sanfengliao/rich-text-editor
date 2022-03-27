import { Element } from './element'
import { Path } from './path';
export class Node {
  constructor(
    public parent: Element | null,
  ) {}

  get index() {
    if (!this.parent) {
      return 0;
    }
    return this.parent.children.indexOf(this);
  }

  setParent(parent: Element) {
    this.parent = parent;
  }

  toJSON(): object {
    throw new Error('toJSON is not implment')
  }
}

export type NodeEntry<T extends Node = Node> = [T, Path]