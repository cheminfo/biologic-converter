import { ComplexObject } from '../../Types';
import { getParams } from '../../utility/getParamsFromText';
import { normalizeKeyValue } from '../../utility/normalize';

/**
 * Adds key value pair to result object, this is used in the text parsers.
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
  kV: string[],
): [ComplexObject, number] {
  const regex = {
    multiline: /^[ \t]/,
  };
  const key: string = kV[0].trim();
  //fixes any extra split on value.
  let val: string = kV.length >= 2 ? kV.slice(1).join(' : ').trim() : '';
  if (key === 'Technique') {
    /* Special key parsing */
    const name = lines[++i].trim();
    const [params, lastLineRead] = getParams(lines, ++i);
    result.settings.variables.techniques.push({ [name]: params || {} });
    i = lastLineRead;
  } else if (regex.multiline.test(lines[i + 1])) {
    /* parse multiline */
    do {
      //lines no more than a few short text lines
      val = val.concat('\n', lines[++i].trim());
    } while (regex.multiline.test(lines[i + 1]));
  }
  //normalize the values (not for technique as it is written already.)
  if (key !== 'Technique') {
    const [newKey, logOrSettings, newVal] = normalizeKeyValue(key, val);
    result[logOrSettings].variables[newKey] = newVal;
  }
  return [result, i];
}
