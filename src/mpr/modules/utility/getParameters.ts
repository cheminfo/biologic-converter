import { IOBuffer } from 'iobuffer';

import { Technique } from '../../../utility/techniqueFromId';

import { unitsScale } from './mapIRangeToMPT';
import { readType as pValue } from './readType';

/*
 * the binary is way less informative than the MPT file so
 * we use a map to get the information from the MPT file
 */
export interface Parameters {
  [name: string]: string | number;
}
/**
 * Parses current technique (type of experiment carried out.)
 * @param buffer - our data at an expected offset
 * @param preParameters - it is a tuple `[name, dataType]` that helps
 * to read the value of type `dataType` later on.
 */
export function getTechniqueParameters(
  buffer: IOBuffer,
  technique: Technique,
  zero: number,
): Parameters {
  const { name, preParameters } = technique;
  const parameters: Parameters = {};
  // Parameters can start at either 0x572, 0x1845 or 0x1846
  for (const off of [0x572, 0x1845, 0x1846]) {
    //byte flags params' start
    buffer.offset = zero + off;
    if (buffer.readUint16() !== 0) {
      const nParams = buffer.readUint16();
      if (name === 'OCV' && nParams < preParameters.length) {
        const recordIndex = 2;
        preParameters.splice(recordIndex, 1);
      }
      if (preParameters.length !== nParams) {
        throw new Error(`The number of parameters is not correct for ${name}`);
      }
      for (let i = 0; i < nParams; i++) {
        const { name: pName, mprReadType: pReadType } = preParameters[i];
        // if name in limits list and NaN then set to "pass"
        const val = pValue(buffer, pReadType);
        if (['Imax', 'Imin', 'EL', 'EM'].includes(pName) && Number.isNaN(val)) {
          parameters[pName] = 'pass';
          continue;
        }
        parameters[pName] =
          pName === 'I Range'
            ? unitsScale(pName, val + 1)
            : pName === 'unit Is'
            ? unitsScale('unit Is', val)
            : val;
      }
      return parameters;
    }
  }
  throw new Error('Found no parameters');
}
