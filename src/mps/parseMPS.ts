import { TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { ComplexObject } from '../Types';
import { normalizeFlag } from '../utility/normalize';

import { addKeyValueToResult } from './utility/addKeyValueToResult';

export interface MPS {
  name: string;
  // linked techniques appear in the order in which they appear in the MPS file
  settings: { variables: ComplexObject };
  log: { variables: ComplexObject };
}
/**
 * Creates an mps object from an mps file
 * output is similar to `MPR.settings.variables`
 * MPS may include one or more techniques
 *
 * @param mps - pass the file as string, Buffer or Arraybuffer.
 * @returns json-like object representing the file
 */

export function parseMPS(mps: TextData): MPS {
  const lines = ensureString(mps, { encoding: 'windows-1252' }).split(/\r?\n/);

  if (lines.length === 0) {
    throw new Error('Empty file');
  } else {
    let result: MPS = {
      // techniques appear in the order in which they appear in the MPS file
      name: lines[0],
      settings: { variables: { techniques: [], flags: [] } },
      log: { variables: { flags: [] } },
    };
    const regex = {
      nothing: /^\s*$/,
      keyValue: / : | :$/,
    };

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i];

      if (regex.nothing.test(currentLine)) {
        continue;
      } else if (regex.keyValue.test(currentLine)) {
        const kV: string[] = currentLine.split(regex.keyValue);
        [result, i] = addKeyValueToResult(result, lines, i, kV);
      } else {
        const [key, logOrSettings, value] = normalizeFlag(currentLine.trim());
        if (value === '') {
          result[logOrSettings].variables.flags.push(key);
        } else {
          result[logOrSettings].variables[key] = value;
        }
      }
    }
    return result;
  }
}
