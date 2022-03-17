export interface LinedOpts {
  eol?: RegExp | string /** end of line, @default /\r?\n/ */;
  index?: number /** buffer index, @default 0 */;
}
/** Split data in lines and read lines
 * @param string - The file as a string.
 * @param [options] - As an object. @default `{eol:'\n', offfset:0}`
 * @param [options.eol] - End of line as string. @default `'\n'`
 * @param [options.index] - Array's index where to start reading. @default `0`
 */
export class Lined {
  /** Array of lines splitted at `options.eol` */
  public lines: string[];
  /** Number of lines */
  public length: number;
  /** where to start reading lines. See `options.index`. */
  public index: number;
  /** end of line as in `options.eol` */
  public eol: RegExp|string;

  public constructor(data: string, options: LinedOpts = {}) {
    const { eol = /\r?\n/, index = 0 } = options;

    this.eol = eol;
    this.index = index;
    this.lines = data.split(this.eol);
    this.length = this.lines.length;
  }
  /* returns line at index and updates index +1 */
  public readLine(): string {
    if (this.index >= this.length) {
      /* check index isn't off the possible indexs */
      throw new Error(
        `Last index is ${this.length - 1}. Current index ${this.index}.`,
      );
    }
    /* because lines comes from toString() is has to be a string[] */
    return this.lines[this.index++];
  }
  public readLines(n: number): string[] {
    /* returns n lines from index to index+n-1 */
    const selectedLines = this.lines.slice(this.index, this.index + n);
    this.index += n;
    return selectedLines;
  }
}

