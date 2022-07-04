import { BinaryData } from 'cheminfo-types';
import { IOBuffer } from 'iobuffer';

<<<<<<< Updated upstream
export type MPR = IOBuffer;
=======
import { ComplexObject } from '../Types';

/**
 * imagine the MPR file as a set of blocks or modules,
 * each with a header, and then the data.
 */
export interface Module {
  header?: ParseHeader;
  data?: ComplexObject;
}

export interface MPR {
  name: string;
  /** a string in the first line */ modules?: Module[];
}

/**
 * Tests if the upcoming data is from a module or not
 * buffer - the IOBuffer object;
 * @returns boolean - true if module, false if not
 */
export function isModule(buffer: IOBuffer):boolean {
  if(buffer.length > buffer.offset+6){
  return buffer.readUtf8(6) === 'MODULE' ? true : false;
}
  return false
}
>>>>>>> Stashed changes

/**
 * Main function parsing the binary data from BioLogic tests
 * arrayBuffer - the data itself.
 * @returns the data as a JSON-like object.
 */
export function parseMPR(arrayBuffer: BinaryData): MPR {
<<<<<<< Updated upstream
  return new IOBuffer(arrayBuffer);
=======
  const buffer = new IOBuffer(arrayBuffer);
  let mpr: Partial<MPR> = {};

  // top level properties
  mpr.name = buffer
    .readUtf8(0x34)
    .replace(/\x1A|\x00/g, '')
    .trim();
  mpr.modules = [];

  let blockN = 1;
  while (isModule(buffer)) {
    const header = new ParseHeader(buffer);
    mpr.modules.push({header});
    /*
    switch(blockN){
    case 1://settings;
      const settings = ParseSettings(buffer);
      mpr.modules.push({header,data:settings})
      break;
    case 2://data
      const data = ParseData(buffer);
      mpr.modules.push({header,data})
      return mpr as MPR
    default:
      return mpr as MPR

}
*/
    //skip data segment as we didn't yet write the parser
    buffer.offset = buffer.offset + header.length;

    blockN++;
  }
  return mpr as MPR;
}

/*
 * Each file has modules with head and body, this parses the header
 * buffer - IOBuffer
 * @returns the header as a JSON-like object
 */
export class ParseHeader {
  public shortName: string; /*shortName:Short name, e.g. VMP Set.*/
  public longName: string; /*longName:Longer name, e.g. VMP settings.*/
  public length: number; /*length:Number of bytes in module data.*/
  public version: number; /*version:Module version.*/
  public date: string; /*date:Acquisition date in ASCII, e.g. 08/10/21. */

  public constructor(buffer: IOBuffer) {
    this.shortName = buffer.readUtf8(10).trim();
    this.longName = buffer.readUtf8(25).trim();
    this.length = buffer.readUint32();
    this.version = buffer.readUint32();
    this.date = buffer.readChars(8); //ascii
  }
>>>>>>> Stashed changes
}
