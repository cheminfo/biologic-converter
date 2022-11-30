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
  preParameters: Technique['preParameters'],
  zero: number,
): Parameters {
  const parameters: Parameters = {};
  // Parameters can start at either 0x572, 0x1845 or 0x1846
  for (const off of [0x572, 0x1845, 0x1846]) {
    //byte flags params' start
    buffer.offset = zero + off;
    if (buffer.readUint16() !== 0) {
      const nParams = buffer.readUint16();
      /*
       * not sure whether next line is correct
       * see https://github.com/dgbowl/yadg/blob/075f1708d03bdd4c4324871cc7bd4b1ffb7e1ccf/src/yadg/parsers/electrochem/eclabmpr.py#L501
       * update: for now we are parsing a subset this would fail
       * https://github.com/dgbowl/yadg/blob/075f1708d03bdd4c4324871cc7bd4b1ffb7e1ccf/src/yadg/parsers/electrochem/eclabtechniques.py#L701
       */
      for (let i = 0; i < Math.min(preParameters.length, nParams); i++) {
        const { name: pName, mprReadType: pReadType } = preParameters[i];
        //if (param[1] === 'Pascal') parameters[param[0]] = pascalString(buffer); //we not using it
        //apparently
        // if name in limits list and NaN then set to "pass"
        const val = pValue(buffer, pReadType);
        if (['Imax', 'Imin', 'EL'].includes(pName) && Number.isNaN(val)) {
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
