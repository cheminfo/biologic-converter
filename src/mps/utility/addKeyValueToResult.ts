import { ComplexObject } from '../../Types';

import { getParams } from '../../utility/getParamsFromText';
import { normalizeKeyValue } from '../../utility/normalize';

/**
 * Adds key value pair to result object, this is used in the text parsers.
 * If the key is _not_ technique, and the value is _not_ multiline,
 * it only runs the last 2 lines, so we also parse a standard key : value
 * those are the 3 cases found in files for key : value
 * function needs refactor but for now it is fine.
 * @param result - the result object we are populating
 * @param lines - the file as array of lines
 * @param i - the current index because we will update it
 * @param kV - the current key value pair
 * @returns `[newObject, newIndex]` tuple
 */
export function addKeyValueToResult(
  result: ComplexObject,
  lines: string[],
  i: number,
  kV: stringp[]
): [ComplexObject, number] {
  const regex = {
    multiline: /^[ \t]/,
  };
  const key: string = kV[0].trim();
  //fixes any extra split on value.
  let val = kV.length > 2 ? kV.slice(1).join(' : ').trim() : kV[1].trim();
  if (key === 'Technique') {
    /* Special key parsing */
    const name = lines[++i].trim();
    const [params, lastLineRead] = getParams(lines, ++i);
    result.techniques.push({ [name]: params || {} });
    i = lastLineRead;
  } else {
    /* if not special key could be regex.multiline */
    while (regex.multiline.test(lines[i + 1])) {
      //use original value then
      val = val.concat('\n', lines[++i].trim());
    }
  }
  //in any case normalize the values
  if (key !== 'Technique') {
    const [newKey, newVal] = normalizeKeyValue(key, val);
    result[newKey] = newVal;
  }
  return [result, i];
}

