import { IOBuffer } from 'iobuffer';

import { Parameters, getTechniqueParameters } from './utility/getParameters';
import { techniqueLookUp } from './utility/techniquesAndParams';

// Represents the data part of the module
export interface ParseSettings {
  technique: string; // Unique technique ID.
  comments: string; // Pascal string.
  activeMaterialMass: number; // Mass of active material
  atX: number; // at x =
  molecularWeight: number; // Molecular weight of active material
  atomicWeight: number; // Atomic weight of intercalated ion
  acquisitionStart: number; // Acquisition started a: xo =
  eTransferred: number; // Number of e- transferred
  electrodeMaterial: string; //Pascal string
  electrolyte: string; //Pascal string
  electrodeArea: number; //Electrode surface area
  referenceElectrode: string; //Pascal string
  characteristicMass: number; //characteristic mass
  batteryCapacity: number; //batery capacity C=
  batteryCapacityUnit: number; //unit of the battery capacity
  /*
   * these will be useful parameters depending on the technique,
   */
  params: Parameters;
  // I think it is actually Parameters[], but atm the parser is simplified.
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
  const zero = buffer.offset;
  const { technique, preParameters } = techniqueLookUp(buffer.readByte());
  object.technique = technique;
  object.comments = buffer.decodeText(buffer.readUint8(), 'windows-1252');
  buffer.offset = zero + 0x107;
  object.activeMaterialMass = buffer.readFloat32();
  object.atX = buffer.readFloat32();
  object.molecularWeight = buffer.readFloat32();
  object.atomicWeight = buffer.readFloat32();
  object.acquisitionStart = buffer.readFloat32();
  object.eTransferred = buffer.readUint16(); // 3 bytes but only 2 are used
  buffer.offset = zero + 0x11e;
  object.electrodeMaterial = buffer.decodeText(
    buffer.readUint8(),
    'windows-1252',
  );
  buffer.offset = zero + 0x1c0;
  object.electrolyte = buffer.decodeText(buffer.readUint8(), 'windows-1252');
  buffer.offset = zero + 0x211;
  object.electrodeArea = buffer.readFloat32();
  object.referenceElectrode = buffer.decodeText(
    buffer.readUint8(),
    'windows-1252',
  );
  buffer.offset = zero + 0x24c;
  object.characteristicMass = buffer.readFloat32();
  object.batteryCapacity = buffer.readFloat32();
  object.batteryCapacityUnit = buffer.readByte();
  object.params = getTechniqueParameters(buffer, preParameters, zero);

  return object as ParseSettings;
}
