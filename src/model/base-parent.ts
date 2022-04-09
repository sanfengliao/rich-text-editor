import { isLeaf } from './leaf';
import { Node, NodeEntry } from './node';
import { Path } from './path';

export class BaseParentNode extends Node {
  children: Node[] = [];

  constructor(public parent: BaseParentNode | null) {
    super(parent);
  }

  append(node: Node) {
    this.children.push(node);
  }

  /**
   * 获取指定path的node
   * @param path
   * @returns {Node}
   */
  get(path: Path) {
    let node: Node = this;
    for (let i = 0; i < path.length; i++) {
      const p = path[i];

      if (!isBaseParentNode(node)) {
        throw new Error(
          `Cannot find a descendant at path [${path}] in node`,
        );
      }

      node = node.children[p];
    }
    return node;
  }

  /**
   * Get the node at a specific path, asserting that it's an ancestor node.
   * @param path
   * @returns
   */
  ancestor(path: Path): BaseParentNode {
    const node = this.get(path);

    if (!isBaseParentNode(node)) {
      throw new Error(
        `Cannot get the ancestor node at path [${path}] because it refers to a text node instead: ${node}`,
      );
    }

    return node;
  }

  /**
   *
   * Return a generator of all the ancestor nodes above a specific path.
   *
   * By default the order is bottom-up, from lowest to highest ancestor in
   * the tree, but you can pass the `reverse: true` option to go top-down.
   * @param path
   * @param options
   */
  * ancestors(
    path: Path,
    options: {
      reverse?: boolean
    } = {},
  ) {
    for (const p of Path.ancestors(path, options)) {
      const n = this.ancestor(p);
      const entry = [n, p];
      yield entry;
    }
  }

  /**
   * Get the child of a node at a specific index.
   * @param index
   * @returns
   */
  childAt(index: number) {
    const c = this.children[index];
    if (c == null) {
      throw new Error(
        `Cannot get child at index \`${index}\` in node: ${JSON.stringify(
          this.toJSON(),
        )}`,
      );
    }
    return c;
  }

  /**
   * Iterate over the children of a node at a specific path.
   */

  * childrenAt(
    path: Path,
    options: {
      reverse?: boolean
    } = {},
  ) {
    const { reverse = false } = options;
    const ancestor = this.ancestor(path);
    const { children } = ancestor;
    let index = reverse ? children.length - 1 : 0;

    while (reverse ? index >= 0 : index < children.length) {
      const child = ancestor.childAt(index);
      const childPath = path.concat(index);
      yield [child, childPath];
      index = reverse ? index - 1 : index + 1;
    }
  }

  has(path: Path): boolean {
    let node: Node = this;

    for (let i = 0; i < path.length; i++) {
      const p = path[i];

      if (!isBaseParentNode(node) || !node.children[p]) {
        return false;
      }

      node = node.children[p];
    }

    return true;
  }

  /**
   *
   * @param root
   * @param path
   * @param another
   * @returns
   */
  common(path: Path, another: Path) {
    const p = Path.common(path, another);
    const n = this.get(p);
    return [n, p];
  }

  /**
   * Get the last node entry in a root node from a path.
   */
  lastAt(path: Path) {
    const p = path.slice();
    let n = this.get(p);

    while (n) {
      if (!isBaseParentNode(n) || n.children.length === 0) {
        break;
      } else {
        const i = n.children.length - 1;
        n = n.children[i];
        p.push(i);
      }
    }
    return [n, p];
  }

  /**
   * 获取路径下第一个节点
   * @param path
   * @returns
   */
  firstAt(path: Path) {
    const p = path.slice();
    let n = this.get(p);

    while (n) {
      if (!isBaseParentNode(n) || n.children.length === 0) {
        break;
      } else {
        n = n.children[0];
        p.push(0);
      }
    }
    return [n, p];
  }

  leaf(path: Path) {
    const node = this.get(path);

    if (!isLeaf(node)) {
      throw new Error(
        `Cannot get the leaf node at path [${path}] because it refers to a non-leaf node: ${node}`,
      );
    }

    return node;
  }

  /**
   * Return a generator of the in a branch of the tree, from a specific path.
   *
   * By default the order is top-down, from lowest to highest node in the tree,
   * but you can pass the `reverse: true` option to go bottom-up.
   */

  * levels(
    path: Path,
    options: {
      reverse?: boolean
    } = {},
  ) {
    for (const p of Path.levels(path, options)) {
      const n = this.get(p);
      yield [n, p];
    }
  }

  /**
   * Return a generator of all the node entries of a root node. Each entry is
   * returned as a `[Node, Path]` tuple, with the path referring to the node's
   * position inside the root node.
   */

  * nodes(
    options: {
      from?: Path
      to?: Path
      reverse?: boolean
      pass?: (entry: NodeEntry) => boolean
    } = {},
  ): Generator<NodeEntry, void, undefined> {
    const { pass, reverse = false } = options;
    const { from = [], to } = options;
    const visited = new Set();
    let p: Path = [];
    let n: Node = this;

    while (true) {
      if (to && (reverse ? Path.isBefore(p, to) : Path.isAfter(p, to))) {
        break;
      }

      if (!visited.has(n)) {
        yield [n, p];
      }

      // If we're allowed to go downward and we haven't descended yet, do.
      if (
        !visited.has(n)
        && isBaseParentNode(n)
        && n.children.length !== 0
        && (pass == null || pass([n, p]) === false)
      ) {
        visited.add(n);
        let nextIndex = reverse ? n.children.length - 1 : 0;

        if (Path.isAncestor(p, from)) {
          nextIndex = from[p.length];
        }

        p = p.concat(nextIndex);
        n = this.get(p);
        continue;
      }

      // If we're at the root and we can't go down, we're done.
      if (p.length === 0) {
        break;
      }

      // If we're going forward...
      if (!reverse) {
        const newPath = Path.next(p);

        if (this.has(newPath)) {
          p = newPath;
          n = this.get(p);
          continue;
        }
      }

      // If we're going backward...
      if (reverse && p[p.length - 1] !== 0) {
        const newPath = Path.previous(p);
        p = newPath;
        n = this.get(p);
        continue;
      }

      // Otherwise we're going upward...
      p = Path.parent(p);
      n = this.get(p);
      visited.add(n);
    }
  }

  toJSON() {
    return this.children.map((node) => node.toJSON());
  }
}

export function isBaseParentNode(val: any): val is BaseParentNode {
  return val instanceof BaseParentNode;
}
