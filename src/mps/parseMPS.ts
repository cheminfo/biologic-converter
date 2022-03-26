import { TextData } from 'cheminfo-types';

import { StringObject, ComplexObject } from '../Types';
import { parseText, SpecialKeyFn } from '../parseText';

/**
 * Object where keys are string, boolean or object,
 * with a max of 2 inner objects
 */
export type MPS = ComplexObject;

/**
 * Parses technique from the _.mps_ file
 * @param i - index to start reading
 * @param lines - lines to read
 * @return `[new technique, new index]` tuple
 */
export const parseTechnique: SpecialKeyFn = (lines, i) => {
  const name = lines[i++].trim(); //1. technique name
  let temp: StringObject = { name };

  for (i; i < lines.length; i++) {
    //2. k-v pairs for this technique
    const kV = lines[i].split(/\s{2,}/);
    if (kV.length === 1) {
      break;
    }
    const k = kV[0].trim();
    const v = kV[1].trim();
    temp[k] = v;
  }
  return [temp, i];
};

/**
 * Creates an mps object from an mps file
 * @param arrayBuffer - pass the file as string,buffer,arraybuffer..
 * @returns object representing the parsed data
 */
export function parseMPS(data: TextData | string[]) {
  return parseText(data, { Technique: parseTechnique });
}
