import { BinaryData } from 'cheminfo-types';
import { IOBuffer } from 'iobuffer';

import { ComplexObject } from '../Types';

import { flagColumns, dataColumns } from './ids';
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
export function isModule(buffer: IOBuffer): boolean {
  if (buffer.length > buffer.offset + 6) {
    return buffer.readUtf8(6) === 'MODULE' ? true : false;
  }
  return false;
}

/**
 * Main function parsing the binary data from BioLogic tests
 * arrayBuffer - the data itself.
 * @returns the data as a JSON-like object.
 */
export function parseMPR(arrayBuffer: BinaryData): MPR {
  const buffer = new IOBuffer(arrayBuffer);
  let mpr: Partial<MPR> = {};

  // top level properties
  mpr.name = buffer
    .readUtf8(0x34)
    .replace(/\x1A|\x00/g, '')
    .trim();
  mpr.modules = [];

  while (isModule(buffer)) {
    const header = new ParseHeader(buffer);
    mpr.modules.push({ header });
    /*
    switch(blockN){
    case 1://settings;
      const settings = ParseSettings(buffer);
      mpr.modules.push({header,data:settings})
      break;
    case 2://data
      const data = ParseData(buffer, header);
      mpr.modules.push({header,data})
      return mpr as MPR
    default:
      return mpr as MPR

}
*/
    //skip data segment as we didn't yet write the parser
    buffer.offset = buffer.offset + header.length;
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
}

//function parseTechParams(buffer, tech) {}
function pascalString(buffer: IOBuffer): string {
  let length = buffer.readUint8();
  return buffer.readChars(length);
}

export class ParseSettings {
  public techniqueId: number; /* Unique technique Id */
  public comments: string; /* Pascal string */
  public activeMaterialMass: number; /* Mass of active material */
  public atX: number; /* at x = */
  public molecularWeight: number; /* Molecular weight of active material */
  public atomicWeight: number; /* Atomic weight of intercalated ion */
  public acquisitionStart: number; /* Acquisition started a: xo = */
  public eTransferred: number; /* Number of e- transferred */
  public electrodeMaterial: string; /* Electrode Material */
  public electrolyte: string; /* electrolyte */
  public electrodeArea: number; /* Electrode surface area */
  public referenceElectrode: string; /* Reference Electrode */
  public characteristicMass: number; /* Characteristic Mass */
  public batteryCapacity: number; /* Battery capacity C = */
  public batteryCapacityUnit: number; /* Unit of the battery capacity */
  public ns?: number; /* Number of sequences */
  public nParams?: number; /* Number of technique parameters */
  //public params?:;

  public constructor(buffer: IOBuffer) {
    const zero = buffer.offset;
    this.techniqueId = buffer.readByte();
    this.comments = pascalString(buffer);
    buffer.offset = zero + 0x107;
    this.activeMaterialMass = buffer.readFloat32();
    this.atX = buffer.readFloat32();
    this.molecularWeight = buffer.readFloat32();
    this.atomicWeight = buffer.readFloat32();
    this.acquisitionStart = buffer.readFloat32();
    this.eTransferred = buffer.readUint16(); // 3 bytes but only 2 are used
    buffer.offset = zero + 0x11e;
    this.electrodeMaterial = pascalString(buffer);
    buffer.offset = zero + 0x1c0;
    this.electrolyte = pascalString(buffer);
    buffer.offset = zero + 0x211;
    this.electrodeArea = buffer.readFloat32();
    this.referenceElectrode = pascalString(buffer);
    buffer.offset = zero + 0x24c;
    this.characteristicMass = buffer.readFloat32();
    this.batteryCapacity = buffer.readFloat32();
    this.batteryCapacityUnit = buffer.readByte();
  }
}

export function parseData(
  buffer: IOBuffer,
  header: ParseHeader,
): Array<Record<string, unknown>> {
  const zero = buffer.offset;
  const dataPoints = buffer.readUint32();
  const columns = buffer.readByte();
  const colIds = new Uint16Array(columns);
  for (let i = 0; i < columns; i++) {
    colIds[i] = buffer.readUint16();
  }
  const data = new Array(dataPoints);

  // Starts of datapoints vary between module versions
  if (header.version <= 2) {
    buffer.offset = zero + 0x195;
  } else {
    buffer.offset = zero + 0x196;
  }

  // Columns data gathering
  for (let i = 0; i < dataPoints; i++) {
    const obj: { [key: string]: number } = {};
    for (const id of colIds) {
      if (id in flagColumns) {
        const flag = flagColumns[id];
        obj[flag[1]] = flag[0] & buffer.readByte(); // mask
      } else if (id in dataColumns) {
        const dat = dataColumns[id];
        obj[dat[1]] = readDtype(buffer, dat[0]);
      }
    }
    data.push(obj);
  }
  return data;
}

/**
 * Read a certain number of bytes in a buffer using a numpy dtype string
 * */
function readDtype(buffer: IOBuffer, dtype: string): number {
  switch (dtype) {
    case 'u1':
      return buffer.readByte();
    case 'u2':
      return buffer.readUint16();
    case 'u4':
      return buffer.readUint32();
    case 'f4':
      return buffer.readFloat32();
    case 'f8':
      return buffer.readFloat64();
    default:
      return 0;
  }
}
