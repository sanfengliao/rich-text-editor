import { Node } from './node'
export class Element extends Node {
  
  constructor(public children: Node[], public parent: Element) {
    super(parent)
  }
}