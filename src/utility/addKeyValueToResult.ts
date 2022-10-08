import { ComplexObject } from '../Types';

import { getParams } from './getParamsFromText';
import { normalizeKeyValue } from './normalize';

/**
 * Adds key value pair to result object, this is used in the text parsers.
 * If the key is _not_ technique, and the value is _not_ multiline,
 * it only runs the last 2 lines, so we also parse a standard key : value
 * those are the 3 cases found in files for key : value
 * function needs refactor but for now it is fine.
 * @param result - the result object we are populating
 * @param lines - the file as array of lines
 * @param currentLine - lines[i]
 * @param regex - the regex we are executing
 * @param i - the current index because we will update it
 * @returns `[newObject, newIndex]` tuple
 */
export function addKeyValueToResult(
  result: ComplexObject,
  lines: string[],
  currentLine: string,
  regex: { keyValue: RegExp; multiline: RegExp; [key: string]: RegExp },
  i: number,
  file: 'MPS' | 'MPT',
): [ComplexObject, number] {
  /* Value single or regex.multiline */
  const kV: string[] = currentLine.split(regex.keyValue); //if many " : " we fix below
  let key: string = kV[0].trim();
  //fixes any extra split on value.
  let val = kV.length > 2 ? kV.slice(1).join(' : ').trim() : kV[1].trim();
  if (key === 'Technique') {
    /* Special key parsing */
    const name = lines[++i].trim();
    const [params, lastLineRead] = getParams(lines, ++i);
    if (file === 'MPS') {
      result.techniques.push({ [name]: params || {} });
    } else if (file === 'MPT') {
      //single technique
      result.technique = name;
      result.params = params || {};
      if (result.techniques) delete result.techniques;
    }
    i = lastLineRead;
  } else {
    /* if not special key could be regex.multiline */
    while (regex.multiline.test(lines[i + 1])) {
      //use original value then
      val = val.concat('\n', lines[++i].trim());
    }
  }
  //in any case normalize the values
  if (key !== 'Technique' || file === 'MPT') {
    const [newKey, newVal] = normalizeKeyValue(key, val);
    result[newKey] = newVal;
  }
  return [result, i];
}
