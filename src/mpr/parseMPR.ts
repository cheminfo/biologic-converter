import { BinaryData } from 'cheminfo-types';
import { IOBuffer } from 'iobuffer';

import { ComplexObject } from '../Types';

import { flagColumns, dataColumns, getParams, unitsScale } from './ids';
/**
 * imagine the MPR file as a set of blocks or modules,
 * each with a header, and then the data.
 */
export interface Module {
  header: ParseHeader;
  variables: ComplexObject;
}

export interface MPR {
  name: string /** a string in the first line */;
  data: Module;
  settings: Module;
  log?: Module;
  loop?: Module;
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

  while (isModule(buffer)) {
    const header = new ParseHeader(buffer);
    const zero = buffer.offset;
    if (/settings/i.exec(header.longName)) {
      mpr.settings = { header: header, variables: new ParseSettings(buffer) };
    } else if (/data/i.exec(header.longName)) {
      mpr.data = { header, variables: parseData(buffer, header) };
    } else if (/log/i.exec(header.longName)) {
      mpr.log = { header: header, variables: new ParseLogs(buffer) };
    } else if (/loop/i.exec(header.longName)) {
      mpr.loop = { header: header, variables: new ParseLoop(buffer) };
    }
    buffer.offset = zero + header.length;
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
  public params: object;
  public header?: object;

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
    this.params = readParams(buffer, getParams(this.techniqueId), zero);
  }
}

export function addData(
  variable: Record<string, Array<number | string>>,
  value: string | number,
) {
  if (!Object.prototype.hasOwnProperty.call(variable, 'data')) {
    variable.data = [];
  }
  variable.data.push(value);
}

export function parseData(
  buffer: IOBuffer,
  header: ParseHeader,
): Record<string, Record<string, Array<number | string> | string>> {
  const zero = buffer.offset; // relative 0x0
  const dataPoints = buffer.readUint32(); // Number of datapoints
  const columns = buffer.readByte(); // Number of columns
  const colIds = new Uint16Array(columns); // Id of the columns
  const units = new Array<string>(columns); // Units for each column
  for (let i = 0; i < columns; i++) {
    const id = buffer.readUint16();
    colIds[i] = id;
    if (id in flagColumns) {
      units[i] = 'flag';
    } else if (id in dataColumns) {
      units[i] = dataColumns[id][2];
    }
  }
  //const data = new Array(dataPoints);

  const variables: Record<
    string,
    Record<string, Array<number | string> | string>
  > = {};
  // Starts of datapoints vary between module versions
  if (header.version <= 2) {
    buffer.offset = zero + 0x195;
  } else {
    buffer.offset = zero + 0x196;
  }

  // Columns data gathering
  for (let i = 0; i < dataPoints; i++) {
    let flagByte = 256;
    for (const id of colIds) {
      if (id in flagColumns) {
        if (flagByte === 256) flagByte = buffer.readByte();
        const flag = flagColumns[id];
        let twosComp = flag[0] & -flag[0];
        let shift = -1;
        while (twosComp > 0) {
          twosComp >>= 1;
          shift++;
        }
        if (!Object.keys(variables).includes(flag[1])) {
          variables[flag[1]] = {};
        }
        const variableName = variables[flag[1]];
        addData(Object(variableName), (flag[0] & flagByte) >> shift);
        if (!Object.prototype.hasOwnProperty.call(variableName, 'label')) {
          variableName.label = flag[1];
        }
        if (!Object.prototype.hasOwnProperty.call(variableName, 'units')) {
          variableName.units = '';
        }
      } else if (id in dataColumns) {
        const dat = dataColumns[id];
        if (!Object.keys(variables).includes(dat[1])) {
          variables[dat[1]] = {};
        }
        const variableName = variables[dat[1]];
        const read = readType(buffer, dat[0]);
        if (id === 0x27) {
          // If ID is I Range
          addData(Object(variableName), Object(unitsScale.iRange)[read]);
        } else {
          addData(Object(variableName), read);
        }
        if (!Object.prototype.hasOwnProperty.call(variableName, 'label')) {
          variableName.label = dat[1];
        }
        if (!Object.prototype.hasOwnProperty.call(variableName, 'units')) {
          variableName.units = dat[2];
        }
      }
    }
  }
  return variables;
}
/*
 * Each file has modules with head and body, this parses the header
 * buffer - IOBuffer
 * @returns the header as a JSON-like object
 */

export class ParseLogs {
  public channelNumber: number; /*Zero-based channel number*/
  public channeSerial: number; /*Channel serial number*/
  public eweControlMin: number; /*Ewe control range min*/
  public eweControlMax: number; /*Ewe control range max*/
  public oleTimestamp: number; /*Timestamp in OLE format */
  public filename: string; /* Filename string */
  public host: string; /* Host ip address */
  public address: string; /* IP address / COM port of potentiostat */
  public ecLabVersion: string; /* EC-Lab software version */
  public serverVersion: string; /* Web server firmware version */
  public interpreterVersion: string; /* Command interpreter firmware version */
  public deviceSerial: string; /* Device serial number */
  public averagingPoints: number; /* Smooth data on these points */

  public constructor(buffer: IOBuffer) {
    const zero = buffer.offset;
    buffer.offset = zero + 0x9;
    this.channelNumber = buffer.readUint8();
    buffer.offset = zero + 0xab;
    this.channeSerial = buffer.readUint16();
    buffer.offset = zero + 0x1f8;
    this.eweControlMin = buffer.readFloat32();
    this.eweControlMax = buffer.readFloat32();
    buffer.offset = zero + 0x249;
    this.oleTimestamp = buffer.readFloat64();
    this.filename = pascalString(buffer);
    buffer.offset = zero + 0x351;
    this.host = pascalString(buffer);
    buffer.offset = zero + 0x384;
    this.address = pascalString(buffer);
    buffer.offset = zero + 0x3b7;
    this.ecLabVersion = pascalString(buffer);
    buffer.offset = zero + 0x3be;
    this.serverVersion = pascalString(buffer);
    buffer.offset = zero + 0x3c5;
    this.interpreterVersion = pascalString(buffer);
    buffer.offset = zero + 0x3cf;
    this.deviceSerial = pascalString(buffer);
    buffer.offset = zero + 0x922;
    this.averagingPoints = buffer.readUint8();
  }
}

/*
 * Each file has modules with head and body, this parses the header
 * buffer - IOBuffer
 * @returns the header as a JSON-like object
 */

export class ParseLoop {
  public numIndexes: number; // Number of loop indexes
  public indexes: number; // Indexes at which loops start in data

  public constructor(buffer: IOBuffer) {
    this.numIndexes = buffer.readUint32();
    this.indexes = buffer.readUint32();
  }
}

export function readParams(
  buffer: IOBuffer,
  params: (string | string[][])[],
  zero: number,
) {
  let read = 0;
  // Parameters can start at either 0x572, 0x1845 or 0x1846
  for (const off of [0x572, 0x1845, 0x1846]) {
    buffer.offset = zero + off;
    read = buffer.readUint16();
    if (read !== 0) break;
  }
  const nParams = buffer.readUint16();
  const paramOut: { [key: string]: number | string } = {};
  paramOut.technique = String(params[0]);
  for (let i = 0; i < Math.min(nParams, params[1].length); i++) {
    const param = params[1][i];
    if (param[1] === 'Pascal') paramOut[param[0]] = pascalString(buffer);
    else paramOut[param[0]] = readType(buffer, param[1]);
  }
  return paramOut;
}
/**
 * Read a certain number of bytes in a buffer using a type string
 * */
function readType(buffer: IOBuffer, type: string): number {
  switch (type) {
    case 'Uint8':
      return buffer.readByte();
    case 'Uint16':
      return buffer.readUint16();
    case 'Uint32':
      return buffer.readUint32();
    case 'Float32':
      return buffer.readFloat32();
    case 'Float64':
      return buffer.readFloat64();
    default:
      return 0;
  }
}
