import { BaseParentNode } from './base-parent';

export class Node {
  dirty = false;
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

  isLastChild() {
    if (!this.parent) {
      return false;
    }
    const { children } = this.parent;
    return children[children.length - 1] === this;
  }

  isFirstChild() {
    if (!this.parent) {
      return false;
    }
    const { children } = this.parent;
    return children[0] === this;
  }

  get nextSibling(): Node | undefined {
    if (!this.parent || this.isLastChild()) {
      return;
    }
    return this.parent.children[this.index + 1];
  }

  get prevSibling(): Node | undefined {
    if (!this.parent || this.isFirstChild()) {
      return;
    }
    return this.parent.children[this.index - 1];
  }

  markDirty() {
    this.dirty = false;
    let n = this.parent;
    while (n && !n.dirty) {
      n.dirty = true;
      n = n.parent;
    }
  }

  setParent(parent: BaseParentNode) {
    this.parent = parent;
  }

  toJSON(): object {
    throw new Error('toJSON is not implment');
  }
}
