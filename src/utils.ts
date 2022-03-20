import { TextData } from "cheminfo-types";
import { ensureString } from "ensure-string";

/** Options for `[[LineReader]]` */
export interface LineReaderOpts{
  /** end of line. default `/\r?\n/` */
  eol?: RegExp | string;
  /** Current index in array. Initial value is `0`. */
  index?: number;
  /** Encoding used by the data. default `utf-8` */
  encoding?:string;
}

/** Tool for reading lines off a file
 * @param data - The file as a string,  ArrayBuffer, etc.
 * @param options - Default `{eol:'\n', index:0 }`
 */
export class LineReader{
  /** lines splitted at `options.eol` */
  private _lines: string[];
  /** stores specific index to easily go back */
  private _record: number;
  /** array length, number of lines */
  public length: number;
  /** Current index in array. @see [[@link `options.index`]]. */
  public index: number;
  /** end of line as in `options.eol` */
  public eol: RegExp|string;

  public constructor(data: TextData, options: LineReaderOpts = {}) {
    /*defaults in case user doesn't pass any*/
    const { eol = /\r?\n/, index = 0, encoding } = options;

    this.eol = eol;
    this.index = index;
    this._record = 0; 
    if(encoding) {
      this._lines = ensureString(data, {encoding:encoding}).split(this.eol);
    } else{
      this._lines = ensureString(data).split(this.eol);
    }
    this.length = this._lines.length;
  }

  /**
   * @returns splitted string as an array
   */
  public getData():string[]{
    return this._lines
  }

  /**
   * reads line **at** index and updates index +1
   * @returns the line at index.
   */
  public readLine():string{
    return this._lines[this.index++];
  }

  /**
   * returns current line + n-1 lines.
   * @param n - number of lines to read
   * @returns selectedLines - subset of lines
   * **Updates index**.
   */
  public readLines(n: number=1): string[] {
    if(!Number.isInteger(n) && n > 0){
      throw new TypeError("argument must be integer and > 0")
    }

    if(n===1) return [this.readLine()];

    const total = this.length 
      const read = this.index;
    const left = total - read; 
    if( n > left){ throw new RangeError(`n ${n} is outside the array's boundary ${left}`) }

    /* returns n lines from index to index+n-1 */
    const selectedLines = this._lines.slice(this.index, this.index+=n);
    return selectedLines;
  }

  /** 
   * Reads lines to desired index **exclusive**
   * @param to - end index exclusive,
   * @return array from current position **to** indicated.
   */
  public readTo(to:number=this.length):string[]{
    return this._lines.slice(this.index, this.index+=to);
  }

  /** 
   * Skips n lines
   * @param n -  number of lines to skip.
   * If `n=1` skips current line
   * example `lines.skip(2)` will skip reading the current line and the next one.
   * @returns this
   */
  public skip(n:number=1):this {
    this.index += n;
    return this
  }

  /** 
   * moves to specific index in the array
   * @returns this
   */
  public seek(newIndex:number=this.index): this{
    this.index = newIndex;
    return this;
  }

  /** 
   * records index so we can come back later
   * @returns this
   */
  public record(): this{
    this._record = this.index;
    return this;
  }

  /** 
   * moves to recorded index
   * @returns this
   */
  public rewind(): this{
    this.index = this._record;
    return this;
  }

  /** 
   * Moves back to the beginning, `index=0`
   * @returns this
   */
  public reset(): this{
    this.index = 0;
    return this;
  }

}

/** Useful Interface for [[`groupFileList`]]
 * which returns an array of these.
 */
export interface GroupedFiles {
id: string;
name: string;
extension: FiletypesOfInterest;
           mpr?: File;
           mps?: File;
           mpt?: File;
}

export type FiletypesOfInterest = "mpr"|"mps"|"mpt";
/**
 * Group files under same directory path
 * The files _must be_ in the same directory to be grouped.
 * @param fileList
 * @return - array that _may_ contain `{mpr, mps and mpt}` as [[`File`]] Objects.
 */
export function groupFileList(fileList: File[]): GroupedFiles[] {

  let results: {[id:string]: Partial<GroupedFiles>} = {};

  for (const file of fileList) {
    const extension = file.name.replace(/.*\./, '');
    const id = file.webkitRelativePath.replace(/\.[^.]+$/, '');

    if (!results[id]) {
      Object.assign(results,{[id]:{ id, name: file.name }});
    }
    switch(extension){/*only analyze those extensions*/
      case "mpr":
      case "mps":
      case "mpt":
        Object.assign(results[id], {[extension]:file})
    }
  }
  return Object.keys(results).map((id) => results[id]) as GroupedFiles[];
}

