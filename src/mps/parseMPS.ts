import { TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { StringObject, ComplexObject } from '../Types';
import { parseMeta, SpecialKeyFn } from '../parseMeta';

/**
 * keys are string, boolean or object,
 * max nested 2
 */
export type MPS = ComplexObject;

/**
 * Parses technique from the _.mps_ file
 * @param lines - lines to read
 * @param i - index to start reading
 * @return `[Technique, new index]` tuple
 */
export function parseTechnique(
  lines: string[],
  i: number,
): ReturnType<SpecialKeyFn> {
  // get technique name
  let technique: StringObject = { name: lines[i++].trim() };

  for (i; i < lines.length; i++) {
    const thisLine = lines[i].trim();

    if (thisLine === '') break;

    // k-v pairs for this technique
    let kV = thisLine.split(/\s{2,}/);
    const k = kV[0].trim();
    const v = kV.slice(1).join('  ').trim();
    technique[k] = v || '';
  }
  return [technique, i - 1]; // i - 1 is the index of the last line read
}

/**
 * Creates an mps object from an mps file
 * @param data - pass the file as string, Buffer or Arraybuffer.
 * @returns JSON object representing the parsed data
 */
export function parseMPS(data: TextData) {
  const lines = ensureString(data, { encoding: 'latin1' }).split(/\r?\n/);
  const fileType = lines.shift(); //remove first element and assign
  return { fileType, ...parseMeta(lines, { Technique: parseTechnique }) };
}
