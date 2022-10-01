import { IOBuffer } from 'iobuffer';

import { readType as pValue } from './readType';
import { TechniqueLookUp } from './techniqueHelpers/techniquesLookUp';

export interface Parameters {
  [key: string]: string | number;
}
/**
 * Parses current technique (type of experiment carried out.)
 * @param buffer - our data at an expected offset
 * @param parameters for technique
 */
export function getTechniqueParameters(
  buffer: IOBuffer,
  preParameters: TechniqueLookUp['preParameters'],
  zero: number,
): Parameters {
  const parameters: Parameters = {};
  // Parameters can start at either 0x572, 0x1845 or 0x1846
  for (const off of [0x572, 0x1845, 0x1846]) {
    //byte flags params' start
    buffer.offset = zero + off;
    if (buffer.readUint16() !== 0) {
      /*
       * not sure whether next line is correct
       * see https://github.com/dgbowl/yadg/blob/075f1708d03bdd4c4324871cc7bd4b1ffb7e1ccf/src/yadg/parsers/electrochem/eclabmpr.py#L501
       * update: for now we are parsing a subset this would fail
       * https://github.com/dgbowl/yadg/blob/075f1708d03bdd4c4324871cc7bd4b1ffb7e1ccf/src/yadg/parsers/electrochem/eclabtechniques.py#L701
       */
      const nParams = buffer.readUint16();
      for (let i = 0; i < Math.min(preParameters.length, nParams); i++) {
        const [pName, pReadType] = preParameters[i];
        // the line below is for some techiques not yet implemented ?
        //if (param[1] === 'Pascal') parameters[param[0]] = pascalString(buffer);
        parameters[pName] = pValue(buffer, pReadType);
      }
      return parameters;
    }
  }
  throw new Error('Found no parameters');
}
