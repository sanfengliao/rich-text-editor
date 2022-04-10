import { BaseParentNode } from './base-parent';
import { Document } from './document';
import { TextNode } from './text-node';

export interface Text {
  text: string;
}

export interface Element {
  children: (Element | Text)[];
}

export function isElement(val: any): val is Element {
  return Array.isArray(val.children);
}

export function createEmptyDocument() {
  const doc = new Document();
  const ele = new BaseParentNode(doc);
  ele.append(new TextNode(ele));
  doc.append(ele);
  return doc;
}

function createBaseParentNodeByJson(json: (Text | Element)[], parent: BaseParentNode | null = null) {
  const doc = new BaseParentNode(parent);
  json.forEach(node => {
    if (isElement(node)) {
      doc.append(createBaseParentNodeByJson(node.children, doc));
    } else {
      doc.append(new TextNode(doc, node.text));
    }
  });
  return doc;
}

export function createDocumentByJson(json: (Text | Element)[]) {
  return createBaseParentNodeByJson(json, null) as Document;
}
