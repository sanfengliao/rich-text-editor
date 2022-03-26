import { Element } from './element'
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

  toJSON(): object {
    throw new Error('toJSON is not implment')
  }
}