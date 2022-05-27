import { StringObject, ComplexObject } from './Types';

/**
 * Parse MPS file and MPT header
 * @module parseMeta
 */

/**
 * Files have an easy part and exceptions during the parsing.
 * Exceptions are treated with functions passed in an object.
 * For example the `{ "Technique": myFn }`.
 */
export interface ParseSpecialKey {
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
 * @param specialKey - Optional for parsing a specific key differently
 * see [[`ParseSpecialKey`]]
 * @returns parsed data as a JSON Object.
 */
export function parseMeta(
  lines: string[],
  specialKey?: ParseSpecialKey,
): ComplexObject {
  /* main object */
  let result: ComplexObject = {};

  /* regex for each case */
  const regex = {
    nothing: /^\s*$/,
    keyValue: /(?: : | :$)/,
    table: /^\w.*\s{2,}-*\w+.*\s{4,}$/,
    multiline: /^[ \t]/,
  };

  let i = 0; //loop over lines

  for (; i < lines.length; i++) {
    // read line by line...

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

      /* when it does split it may be regex.multiline */
      /* Special key parsing */
      if (specialKey && key in specialKey && val) {
        const [newObject, lastLineRead] = specialKey[key](lines, ++i) as [
          StringObject,
          number,
        ];

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
      const key: string = kV[0].trim();
      const val: string | boolean = kV[1].trim();
      result[key] = val;
    } else {
      //boolean
      if ('flags' in result && Array.isArray(result.flags)) {
        result.flags.push(currentLine);
      } else {
        result.flags = [currentLine];
      }
    }
  }
  return result;
}
