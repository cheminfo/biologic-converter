import { IOBuffer } from 'iobuffer';

import { parseTechnique } from './utility/parseTechnique';
import { techniqueLookUp } from './utility/techniqueHelpers/techniqueLookUp';
import {readParameterValue } from './utility/techniqueHelpers/readParametersValue';
import { pascalString } from './utility/pascalString';

// settings has a general set of keys, and then some specific for the technique
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
  /*
  * these will be useful parameters depending on the technique, 
  * but not the main data (seeparseData)
  */
  technique: ParseTechnique;
}
 /**
 * Parses the experiments settings
 * @param buffer - the data at a precise offset
 * @returns Settings as an object
 * this should likely converge to MPS (working on it).
 * bc these are experiment settings should this converge to MPS? (working on it.)
 */
export function parseSettings(buffer: IOBuffer) {
  let object: Partial<ParseSettings> = {};
  buffer.mark();//flags module offset, used in readParams
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
  object.technique = parseTechnique(buffer, techniqueLookUp(object.techniqueId));

  return object as ParseSettings;
}
