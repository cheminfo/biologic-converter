import { ComplexObject } from '../Types';
import { normalizeKeyValue } from '../utility/normalize';
/**
 * Creates an mps object from an mps file
 * The output is similar, but not the same, than `MPR.settings`
 * MPS includes one or more techniques
 * We will know what this means when using it.
 *
 * @param data - pass the file as string, Buffer or Arraybuffer.
 * @returns JSON object representing the parsed data
 */

export function parseSettings(
  lines: string[],
  technique: string,
): ComplexObject {
  // file converted to an array of strings, each item a newline.

  let result: ComplexObject = { technique, params: [] };

  const regex = {
    nothing: /^\s*$/,
    keyValue: / : | :$/,
    multiline: /^[ \t]/,
    table: /^\w.*\s{2,}-*\w+.*\s{4,}$/,
  };

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];

    if (regex.nothing.test(currentLine)) {
      continue;
    } else if (regex.keyValue.test(currentLine)) {
      const kV: string[] = currentLine.split(regex.keyValue); //if many " : " we fix below
      //function updates the index bc some values are multiline
      let key: string = kV[0].trim();
      let val: string = kV.slice(1).join(' : ').trim();
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
