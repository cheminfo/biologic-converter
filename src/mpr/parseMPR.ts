import { BinaryData } from 'cheminfo-types';
import { IOBuffer } from 'iobuffer';

import { ComplexObject } from '../Types';

import { flagColumns, dataColumns, getParams, unitsScale } from './ids';
/**
 * imagine the MPR file as a set of blocks or modules,
 * each with a header, and then the data.
 */
export interface Module {
  header: Record<string, string | number>;
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
    return buffer.readUtf8(6) === 'MODULE';
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
    const header = parseHeader(buffer);
    const zero = buffer.offset;
    if (/settings/i.exec(String(header.longName))) {
      mpr.settings = { header, variables: parseSettings(buffer) };
    } else if (/data/i.exec(String(header.longName))) {
      mpr.data = { header, variables: parseData(buffer, header) };
    } else if (/log/i.exec(String(header.longName))) {
      mpr.log = { header, variables: parseLogs(buffer) };
    } else if (/loop/i.exec(String(header.longName))) {
      mpr.loop = { header, variables: parseLoop(buffer) };
    }
    buffer.offset = zero + Number(header.length);
  }
  return mpr as MPR;
}

/*
 * Each file has modules with head and body, this parses the header
 * buffer - IOBuffer
 * @returns the header as a JSON-like object
 */

function parseHeader(buffer: IOBuffer) {
  const object: Record<string, string | number> = {};
  object.shortName = buffer.readUtf8(10).trim();
  object.longName = buffer.readUtf8(25).trim();
  object.length = buffer.readUint32();
  object.version = buffer.readUint32();
  object.date = buffer.readChars(8); //ascii
  return object;
}

//function parseTechParams(buffer, tech) {}
function pascalString(buffer: IOBuffer): string {
  let length = buffer.readUint8();
  return buffer.readChars(length);
}

function parseSettings(buffer: IOBuffer) {
  const object: Record<
    string,
    string | number | { [key: string]: string | number }
  > = {};
  const zero = buffer.offset;
  object.techniqueId = buffer.readByte();
  object.comments = pascalString(buffer);
  buffer.offset = zero + 0x107;
  object.activeMaterialMass = buffer.readFloat32();
  object.atX = buffer.readFloat32();
  object.molecularWeight = buffer.readFloat32();
  object.atomicWeight = buffer.readFloat32();
  object.acquisitionStart = buffer.readFloat32();
  object.eTransferred = buffer.readUint16(); // 3 bytes but only 2 are used
  buffer.offset = zero + 0x11e;
  object.electrodeMaterial = pascalString(buffer);
  buffer.offset = zero + 0x1c0;
  object.electrolyte = pascalString(buffer);
  buffer.offset = zero + 0x211;
  object.electrodeArea = buffer.readFloat32();
  object.referenceElectrode = pascalString(buffer);
  buffer.offset = zero + 0x24c;
  object.characteristicMass = buffer.readFloat32();
  object.batteryCapacity = buffer.readFloat32();
  object.batteryCapacityUnit = buffer.readByte();
  object.params = readParams(buffer, getParams(object.techniqueId), zero);
  return object;
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
  header: Record<string, string | number>,
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
 * Most files have logs, this parses logs
 * buffer - IOBuffer
 * @returns the header as a JSON-like object
 */

function parseLogs(buffer: IOBuffer) {
  const object: Record<string, string | number> = {};
  const zero = buffer.offset;
  buffer.offset = zero + 0x9;
  object.channelNumber = buffer.readUint8();
  buffer.offset = zero + 0xab;
  object.channeSerial = buffer.readUint16();
  buffer.offset = zero + 0x1f8;
  object.eweControlMin = buffer.readFloat32();
  object.eweControlMax = buffer.readFloat32();
  buffer.offset = zero + 0x249;
  object.oleTimestamp = buffer.readFloat64();
  object.filename = pascalString(buffer);
  buffer.offset = zero + 0x351;
  object.host = pascalString(buffer);
  buffer.offset = zero + 0x384;
  object.address = pascalString(buffer);
  buffer.offset = zero + 0x3b7;
  object.ecLabVersion = pascalString(buffer);
  buffer.offset = zero + 0x3be;
  object.serverVersion = pascalString(buffer);
  buffer.offset = zero + 0x3c5;
  object.interpreterVersion = pascalString(buffer);
  buffer.offset = zero + 0x3cf;
  object.deviceSerial = pascalString(buffer);
  buffer.offset = zero + 0x922;
  object.averagingPoints = buffer.readUint8();
  return object;
}

/*
 * Some files have a loop, this parses the loop
 * buffer - IOBuffer
 * @returns the header as a JSON-like object
 */

function parseLoop(buffer: IOBuffer) {
  const object: Record<string, string | number> = {};
  object.numIndexes = buffer.readUint32();
  object.indexes = buffer.readUint32();
  return object;
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
