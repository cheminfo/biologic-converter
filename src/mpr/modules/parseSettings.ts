import { IOBuffer } from 'iobuffer';

import { getParams } from '../utility/getParams';
import { pascalString } from '../utility/pascalString';
import { readType } from '../utility/readType';

export interface ParseSettings {
  techniqueId: number;
  comments: string;
  activeMaterialMass: number;
  atX: number;
  molecularWeight: number;
  atomicWeight: number;
  acquisitionStart: number;
  eTransferred: number;
  electrodeMaterial: string;
  electrolyte: string;
  electrodeArea: number;
  referenceElectrode: string;
  characteristicMass: number;
  batteryCapacity: number;
  batteryCapacityUnit: number;
  params: ParamOut;
}
export function parseSettings(buffer: IOBuffer) {
  let object: Partial<ParseSettings> = {};
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
  return object as ParseSettings;
}

type ParamOut = Record<string, string | number>;
function readParams(
  buffer: IOBuffer,
  params: ReturnType<typeof getParams>,
  zero: number,
): ParamOut {
  let read = 0;
  // Parameters can start at either 0x572, 0x1845 or 0x1846
  for (const off of [0x572, 0x1845, 0x1846]) {
    buffer.offset = zero + off;
    read = buffer.readUint16();
    if (read !== 0) break;
  }
  const nParams = buffer.readUint16();
  const paramOut: ParamOut = {};
  paramOut.technique = params[0];
  for (let i = 0; i < Math.min(nParams, params[1].length); i++) {
    const param = params[1][i];
    if (param[1] === 'Pascal') paramOut[param[0]] = pascalString(buffer);
    else paramOut[param[0]] = readType(buffer, param[1]);
  }
  return paramOut;
}
