import { TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { ComplexObject } from '../Types';
import { camalize } from './utility/camalize';
import { normalizeKeyValue } from './utility/normalize';
import { getParams } from './utility/getParamsFromText';

/*
 * these will be useful parameters depending on the technique,
 */
/**
 * Creates an mps object from an mps file
 * The output is similar, but not the same, than `MPR.settings.variables`
 * The main difference is that MPS includes one or more techniques as an
 * whereas MPT and MPR seem to have always one
 * We will know what this means when using it.
 *
 * @param data - pass the file as string, Buffer or Arraybuffer.
 * @returns JSON object representing the parsed data
 */
export function parseMPS(mps: TextData): ComplexObject {
  const lines = ensureString(mps, { encoding: 'windows-1252' }).split(/\r?\n/);
  let result: ComplexObject = { name: lines.shift(), techniques: [] };
  const regex = {
    /* regex for each case */ nothing: /^\s*$/,
    keyValue: / : | :$/,
    table: /^\w.*\s{2,}-*\w+.*\s{4,}$/,
    multiline: /^[ \t]/,
  };

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];

    if (regex.nothing.test(currentLine)) {
      continue;
    } else if (regex.keyValue.test(currentLine)) {
      /* Value single or regex.multiline */

      const kV: string[] = currentLine.split(regex.keyValue); //if many " : " we fix below
      let key: string = kV[0].trim();
      let val = '';

      /* length is normally 2, it may be larger */
      val = kV.length > 2 ? kV.slice(1).join(' : ').trim() : kV[1].trim();

      if (key === 'Technique') {
        /* Special key parsing */
        const name = lines[++i].trim();
        const [params, lastLineRead] = getParams(lines, ++i);
        if (params) {
          params.technique = name;
          result.techniques.push(params);
        }
        i = lastLineRead;
        continue; //next line, next loop
      }

      /* if not special key could be regex.multiline */
      while (regex.multiline.test(lines[i + 1])) {
        //use original value then
        val = val.concat('\n', lines[++i].trim());
      }

      const [newKey, newVal] = normalizeKeyValue(key, val);
      result[newKey] = newVal;
    } else if (regex.table.test(currentLine)) {
      /* for not k : v */
      //regex.table
      const kV: string[] = currentLine.split(/\s{2,}/);
      const [key, val] = [kV[0].trim(), kV.slice(1).join('  ').trim()];
      result[key] = val;
    } else if (Array.isArray(result.flags)) {
      result.flags.push(currentLine);
    } else {
      result.flags = [currentLine];
    }
  }
  return result;
}
