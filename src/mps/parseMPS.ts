import { TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { ComplexObject } from '../Types';
import { normalizeFlag } from '../utility/normalize';

import { addKeyValueToResult } from './utility/addKeyValueToResult';

/**
 * Creates an mps object from an mps file
 * The output is similar, but not the same, than `MPR.settings.variables`
 * MPS includes one or more techniques
 * We will know what this means when using it.
 *
 * @param mps - pass the file as string, Buffer or Arraybuffer.
 * @returns JSON object representing the parsed data
 */

export function parseMPS(mps: TextData): ComplexObject {
  const lines = ensureString(mps, { encoding: 'windows-1252' }).split(/\r?\n/);
  let result: ComplexObject = {
    name: lines.shift(),
    // the techniques appear in the order in which they appear in the MPS file
    //which is the order they were applied.(presumably)
    settings: { variables: { techniques: [], flags: [] } },
    log: { variables: {}, flags: [] },
  };
  const regex = {
    nothing: /^\s*$/,
    keyValue: / : | :$/,
  };

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];

    if (regex.nothing.test(currentLine)) {
      continue;
    } else if (regex.keyValue.test(currentLine)) {
      //function updates the index bc some values are multiline
      const kV: string[] = currentLine.split(regex.keyValue); //if many " : " we fix below
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
