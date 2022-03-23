import { TextData } from "cheminfo-types";
import { ensureString } from "ensure-string";

import { PartialFileList } from "./index";

/** 
 * Interface for [[`groupFiles`]]
 * which returns an array of these.
 */
export interface GroupedFiles {
      /** group id used to group the files under same path */
      gid: string,
      /** file name as taken from [[`File`]] or compatible class.*/
      name: string,
      /** file extension if it has an extension */
      extension?: string,
      /** there is no other way atm, this will store the files */
      [file:string]:any
}

/**
 * Options for [[`groupFiles`]]
 */
export interface GroupFilesOptions {
  /** A path like `./dir1/dir2/base.ext` will use `./dir1/dir2/base` as id. 
   * Sets `useExtension:true`. Can segregate files. */
  idWithBasename?:boolean,
  /** The `./dir1/dir2/base.ext` file data be stored under `base.ext` key */
  useFilename?:boolean,
  /** The `./dir1/dir2/base.ext` will be stored under `base` key */
  useBasename?:boolean,
  /** The `./dir1/dir2/base.ext` will be stored under `ext` key. 
   * If no extension is found in file, it will use the basename. */
  useExtension?:boolean,
  /** both extension and  basename are lowercased, it doesnt touch the `id` field. */
  lowerCaseFileKey?:boolean,
}

/**
 * Group files under same directory path
 * i.e `[Dir1, Dir2, Dir3...]`  where each Dir object ooks like this
 * ```
 * { 
 *   id,
 *   extension,
 *   name,
 *   fileA,
 *   fileB,...
 *  }
 *  ```
 * See `[[GroupFilesOptions]]` for all options.
 * Files _must be_ in the same directory to be grouped. 
 * @param fileList
 * @return - array that _may_ contain `{mpr, mps and mpt}` as [[`File`]] Objects.
 */
export function groupFiles(fileList: FileList | PartialFileList, options:GroupFilesOptions ={ }): GroupedFiles[] {

  let { 
      idWithBasename, 
      useExtension,
      useFilename,
      useBasename,
      lowerCaseFileKey
  } = options; 

  let results: Record<string, Partial<GroupedFiles>> = { };

  for (const file of fileList) {
    /* set up some variables */
    let filename = file.name;
    if(lowerCaseFileKey) filename=filename.toLowerCase();
    const basename = filename.replace(/\.[^.]+$/,'');
    const extension = filename.replace(/.*\./, '');
    let gid;

    /* set the unique grouping id */
    if(idWithBasename){
      gid = file.webkitRelativePath.replace(/\.[^\/]+$/, '');
    } else {//just dir path
      gid = file.webkitRelativePath.replace(/\.[^.]+$/, '');
    }

    /* create the partial group object inside results */
    if (!results[gid]) {
      Object.assign(results,{[gid]:{ gid, name: filename }});
    }

    /* place file under a particular group `results[gid]` */
    if(useExtension){ //by extension | basename
      Object.assign(results[gid], { [extension||basename]:file })
    } else if(useBasename){ //by basename
      Object.assign(results[gid], { [basename]:file })
    }
    else {// by fullname
      Object.assign(results[gid], { [filename]:file })
    }
  }
  return Object.keys(results).map((gid) => results[gid]) as GroupedFiles[];
}

/** Options for `[[LineReader]]` */
export interface LineReaderOpts{
  /** end of line. default `/\r?\n/` */
  eol?: RegExp | string;
  /** Current index in array. Initial value is `0`. */
  index?: number;
  /** Encoding used by the data. default `utf-8` */
  encoding?:string;
}

/** Tool for reading lines off a file or string
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
  public eol?: RegExp|string;

  public constructor(data: TextData|string[], options: LineReaderOpts = {}) {
    /*defaults in case user doesn't pass any*/
    const { eol, index = 0, encoding } = options;

    if(!Array.isArray(data)){
      this.eol = eol || /\r?\n/;
      if(encoding) {
        this._lines = ensureString(data, {encoding:encoding}).split(this.eol);
      } else{
        this._lines = ensureString(data).split(this.eol);
      } } else { this._lines=data }

    this.index = index;
    this._record = 0; 
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
