import { IOBuffer } from 'iobuffer';

import { readType as pValue } from './readType';
import { TechniqueLookUp } from './techniqueHelpers/techniquesLookUp';

// can be improved by having an interface that for each technique as a specific type
export interface ParseTechnique {
  technique: string;
  [key: string]: string | number;
}
/**
 * Parses current technique (type of experiment carried out.)
 * @param buffer - our data at an expected offset
 * @param params -  from [[`getParams`]] function
 */
export function parseTechnique(
  buffer: IOBuffer,
  { technique, parameters }: TechniqueLookUp,
): ParseTechnique {
  let read = 0;

  // Parameters can start at either 0x572, 0x1845 or 0x1846
  for (const off of [0x572, 0x1845, 0x1846]) {
    //byte flags params' start
    buffer.reset(); //back to module start byte
    buffer.offset += off;
    read = buffer.readUint16();
    if (read !== 0) break;
  }

  const nParams = buffer.readUint16();
  const parsedTechnique: ParseTechnique = { technique };

  // I guess this is in case not ,,,all parameters,,, are parsed?
  for (let i = 0; i < Math.min(nParams, parameters.length); i++) {
    const [pName, pReadType] = parameters[i];
    // there is no param named Pascal ?
    //if (param[1] === 'Pascal') parameters[param[0]] = pascalString(buffer);
    parsedTechnique[pName] = pValue(buffer, pReadType);
  }
  return parsedTechnique;
}
