import { Element, isElement } from './element';
import { isTextNode, TextNode } from './text-node';
import { Node } from './node'
import { Range } from './range';
import { Point } from './point';
import { Path } from './path';

export class Document extends Element {

  static createEmptyDocument() {
    const doc = new Document();
    const ele = new Element(doc)
    ele.addNode(new TextNode(ele))
    doc.addNode(ele);
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
      const node = this.getNode(path);
      if (isTextNode(node)) {
        node.insertText(offset, text);
        range.insertText(text);
      }
  }

  getNode(path: Path) {
    let node: Node = this;
    for (let i = 0; i < path.length; i++) {
      const p = path[i]

      if (!isElement(node)) {
        throw new Error(
          `Cannot find a descendant at path [${path}] in node`
        )
      }

      node = node.children[p]
    }
    return node;
  }
}