import { isTextNode, TextNode } from './text-node';
import { Range } from './range';
import { Point } from './point';
import { Path } from './path';
import { Element } from './element';

export class Document extends Element {

  static createEmptyDocument() {
    const doc = new Document();
    const ele = new Element(doc)
    ele.append(new TextNode(ele))
    doc.append(ele);
    const point = new Point([0, 0], 0)
    doc.selection = new Range(point, point);
    return doc;
  }

  selection!: Range;
  constructor() {
    super(null);
  }

  insertText(text: string, range: Range = this.selection) {
      const { path, offset } = range.start;
      const node = this.get(path);
      if (isTextNode(node)) {
        node.insertText(offset, text);
        range.insertText(text);
      }
  }

}