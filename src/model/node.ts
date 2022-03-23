import { Element } from './element'
export class Node {
  constructor(
    public parent: Element,
  ) {}

  get index() {
    return this.parent.children.indexOf(this);
  }
}