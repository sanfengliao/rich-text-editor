import { Path } from "./path";
import { Point } from "./point";

export class Range {
  constructor(public start: Point, public end: Point) {
  }

  insertText(text: string) {
    if (this.isCollapsed()) {
      this.start.insertText(text);
      this.end = this.start;
    } else {
      this.start.insertText(text);
      this.end.insertText(text);
    }
  }

  /**
   * Check if a range is exactly equal to another.
   */
   equals(another: Range): boolean {
    const { start, end } = this;
    return (
      start.equals(another.start)
      && end.equals(another.end)
    );
  }

  
  /**
   * Check if a range is collapsed, meaning that both its anchor and focus
   * points refer to the exact same position in the document.
   * @returns 
   */
  isCollapsed(): boolean {
    const { start, end } = this
    return start.equals(end);
  };


  includeRange(target: Range) {
    return this.includePoint(target.start)
  }

  includePath(path: Path) {
    const { start, end } = this;

    return Path.compare(path, start.path) >= 0 && Path.compare(path, end.path) <= 0;

  }

  includePoint(point: Point) {
    const { start, end } = this;
    return point.compare(start) >= 0 && point.compare(end) <= 0;
  }

  /**
   * Get the intersection of a range with another.
   * 获取和另一个range的交集
   */
   intersection(another: Range): Range | null {
    const { start: s1, end: e1 } = this
    const { start: s2, end: e2 } = another;
    const start = s1.isBefore(s2) ? s2 : s1
    const end = e1.isBefore(e2) ? e1 : e2

    if (end.isBefore(start)) {
      return null
    } else {
      return new Range(start.clone(), end.clone())
    }
  }
}