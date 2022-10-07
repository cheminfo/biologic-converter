import { TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { ComplexObject } from '../Types';
import { parseMeta } from '../parseMeta';

/**
 * Creates an mps object from an mps file
 * The output is similar, but not the same, than `MPR.settings.variables`
 * @param data - pass the file as string, Buffer or Arraybuffer.
 * @returns JSON object representing the parsed data
 */
export function parseMPS(mps: TextData): ComplexObject {
  const lines = ensureString(mps, { encoding: 'windows-1252' }).split(/\r?\n/);
  const name = lines.shift(); //remove first element and assign
  return { name, ...parseMeta(lines) };
}
