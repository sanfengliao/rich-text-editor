import { BaseParentNode } from './base-parent';
import { Leaf } from './leaf';

export class TextNode extends Leaf {
  constructor(parent: BaseParentNode, public text: string = '') {
    super(parent);
  }

  insertText(offset: number, text: string) {
    const before = this.text.slice(0, offset);
    const after = this.text.slice(offset);
    this.text = before + text + after;
  }

  toJSON() {
    return {
      text: this.text,
    };
  }
}

export function isTextNode(val: any): val is TextNode {
  return val instanceof TextNode;
}
