import { StringObject, ComplexObject } from './Types';

/**
 * Parse MPS file and MPT header
 */

/**
 * Some keys' value are actually an object.
 * These are parsed with a separate function.
 * For example the `{ "Technique": parseTechnique }`.
 */
export interface SpecialKeys {
  [name: string]: SpecialKeyFn;
}

/**
 * Special-key parsing-function signature.
 */
export type SpecialKeyFn = (
  lines: string[],
  index: number,
) => [exception: StringObject, nextLineIndex: number];

/**
 * Parses MPS or MPT's header,
 * @param lines - string array to be parsed,
 * @param specialKeys - Optional object for parsing specific key(s) with a function.
 * see [[`SpecialKeys`]]
 * @returns parsed data as a JSON Object.
 */
export function parseMeta(
  lines: string[],
  specialKeys?: SpecialKeys,
): ComplexObject {
  /* main object */
  let result: ComplexObject = {};

  /* regex for each case */
  const regex = {
    nothing: /^\s*$/,
    keyValue: / : | :$/,
    table: /^\w.*\s{2,}-*\w+.*\s{4,}$/,
    multiline: /^[ \t]/,
  };

  let i = 0; //loop over lines

  for (; i < lines.length; i++) {

    const currentLine = lines[i];

    /* empty line, continue */
    if (regex.nothing.test(currentLine)) {
      continue;
    } else if (regex.keyValue.test(currentLine)) {
      /* key val pairs. Value is single or regex.multiline */

      const kV: string[] = currentLine.split(regex.keyValue); //if many " : " we fix below
      const key: string = kV[0].trim();
      let val = '';

      /* length is normally 2, it may be larger */
      val = kV.length > 2 ? kV.slice(1).join(' : ').trim() : kV[1].trim();

      /* Special key parsing */
      if (specialKeys && key in specialKeys && val) {
        const [newObject, lastLineRead] = specialKeys[key](lines, i + 1);

        if (key in result) {
          // example `result["Technique"]["2"]`
          result[key][val] = newObject;
        } else {
          result[key] = { [val]: newObject };
        }
        i = lastLineRead;
        continue; //next line
      }

      /* if not special key could be regex.multiline */
      while (regex.multiline.test(lines[i + 1])) {
        val = val.concat('\n', lines[++i].trim());
      }

      result[key] = val;
    } else if (regex.table.test(currentLine)) {
      /* for not k : v */
      //regex.table
      const kV: string[] = currentLine.split(/\s{2,}/);
      const [key, val] = [kV[0].trim(), kV.slice(1).join('  ').trim()];
      result[key] = val;
    } else {
      Array.isArray(result.flags) ? 
        result.flags.push(currentLine) :
        result.flags = [currentLine];
    }
  }
  return result;
}
