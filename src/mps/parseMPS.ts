import { TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { ComplexObject } from '../Types';
import { addKeyValueToResult } from '../utility/addKeyValueToResult';

/**
 * Creates an mps object from an mps file
 * The output is similar, but not the same, than `MPR.settings`
 * MPS includes one or more techniques
 * We will know what this means when using it.
 *
 * @param data - pass the file as string, Buffer or Arraybuffer.
 * @returns JSON object representing the parsed data
 */

export function parseMPS(mps: TextData): ComplexObject {
  // file converted to an array of strings, each item a newline.
  const lines = ensureString(mps, { encoding: 'windows-1252' }).split(/\r?\n/);

  let result: ComplexObject = { name: lines.shift(), techniques: [] };

  const regex = {
    nothing: /^\s*$/,
    keyValue: / : | :$/,
    multiline: /^[ \t]/,
  };

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];

    if (regex.nothing.test(currentLine)) {
      continue;
    } else if (regex.keyValue.test(currentLine)) {
      //function updates the index bc some values are multiline
      [result, i] = addKeyValueToResult(result, lines, currentLine, regex, i, "MPS");
    } else if (Array.isArray(result.flags)) {
      result.flags.push(currentLine);
    } else {
      result.flags = [currentLine];
    }
  }
  return result;
}
