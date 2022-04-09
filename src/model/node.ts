import { BaseParentNode } from './base-parent';
import { Path } from './path';

export class Node {
  constructor(
    public parent: BaseParentNode | null,
  ) {
  }

  get index() {
    if (!this.parent) {
      return 0;
    }
    return this.parent.children.indexOf(this);
  }

  setParent(parent: BaseParentNode) {
    this.parent = parent;
  }

  toJSON(): object {
    throw new Error('toJSON is not implment');
  }
}

export type NodeEntry<T extends Node = Node> = [T, Path]
