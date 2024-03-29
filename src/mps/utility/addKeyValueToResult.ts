import { getParams } from '../../utility/getParamsFromText';
import { normalizeKeyValue } from '../../utility/normalize';
import { techniqueFromLongName } from '../../utility/techniqueFromLongName';
import { MPS } from '../parseMPS';

/**
 * Adds key value pair to result object
 * @param result - the result object we are populating
 * @param lines - the file as array of lines
 * @param i - the current index because we will update it
 * @param kV - the current key value pair
 * @returns `[newObject, newIndex]` tuple
 */
export function addKeyValueToResult(
  result: MPS,
  lines: string[],
  i: number,
  kV: string[],
): [MPS, number] {
  const regex = {
    multiline: /^[\t ]/,
  };
  const key: string = kV[0].trim();
  //fixes any extra split on value.
  let val: string = kV.length >= 2 ? kV.slice(1).join(' : ').trim() : '';
  if (key === 'Technique') {
    const fullName = lines[++i].trim();
    const { name: shortName, preParameters } = techniqueFromLongName(fullName);
    //from the technique short name we know how many lines to read.
    const [params, lastLineRead] = getParams(preParameters, lines, ++i);
    result.settings.variables.techniques.push({ [shortName]: params });
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
