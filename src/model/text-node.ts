import { Element } from './element';
import { Node } from './node';
import { BaseInsertTextOperation } from './operation';

export class TextNode extends Node {

  constructor(parent: Element, public text: string = '') {
    super(parent)
  }

  insertText(offset: number, text: string, ) {
    const before = this.text.slice(0, offset)
    const after = this.text.slice(offset)
    this.text = before + text + after
  }

  toJSON() {
    return {
      text: this.text
    }
  }
}

export function isTextNode(val: any): val is TextNode {
  return val instanceof TextNode;
}