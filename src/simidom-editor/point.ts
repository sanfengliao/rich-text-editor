import { Path } from './path';

export const isPoint = (value: any): value is Point => value instanceof Point;

export class Point {
  constructor(public path: Path, public offset: number) {

  }

  insertText(text: string) {
    this.offset += text.length;
  }

  /**
   * Compare a point to another, returning an integer indicating whether the
   * point was before(-1), at(0), or after(1) the other.
   * @param another
   * @returns
   */
  compare(another: Point) {
    const result = Path.compare(this.path, another.path);

    if (result === 0) {
      if (this.offset < another.offset) return -1;
      if (this.offset > another.offset) return 1;
      return 0;
    }

    return result;
  }

  /**
   * Check is after another.
   * @param another
   * @returns
   */
  isAfter(another: Point) {
    return this.compare(another) === 1;
  }

  /**
   * Check is before another.
   * @param another
   * @returns
   */
  isBefore(another: Point) {
    return this.compare(another) === -1;
  }

  equals(another: Point): boolean {
    // PERF: ensure the offsets are equal first since they are cheaper to check.

    return (
      this === another ||
      (this.offset === another.offset && Path.equals(this.path, another.path))
    );
  }

  clone() {
    return new Point(this.path.slice(), this.offset);
  }
}
