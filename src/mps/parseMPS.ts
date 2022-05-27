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
 * @param i - index to start reading
 * @param lines - lines to read
 * @return `[Technique, new index]` tuple
 */
export function parseTechnique(
  lines: string[],
  i: number,
): ReturnType<SpecialKeyFn> {
  // get technique name
  let technique: StringObject = { name: lines[i++].trim() };

  while (i < lines.length) {
    const thisLine = lines[i++].trim();

    if (thisLine === '') {
      break;
    }

    // k-v pairs for this technique
    let [k, v] = thisLine.split(/\s{2,}/);

    if (k && typeof k === 'string') {
      technique[k] = v || '';
    } else {
      throw new Error('Missing key in Technique. File corrupted?');
    }
  }
  const lastLineReadIndex = i - 1;
  return [technique, lastLineReadIndex];
}

/**
 * Creates an mps object from an mps file
 * @param data - pass the file as string, Buffer or Arraybuffer.
 * @returns JSON object representing the parsed data
 */
export function parseMPS(data: TextData) {
  const lines = ensureString(data, { encoding: 'latin1' }).split(/\r?\n/);
  const result = parseMeta(lines.slice(1,), { Technique: parseTechnique })
  result.fileType = lines[0]
  return result
}
