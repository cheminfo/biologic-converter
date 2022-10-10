import { ComplexObject } from '../Types';
import { getParams } from '../utility/getParamsFromText';
import { normalizeFlag, normalizeKeyValue } from '../utility/normalize';
/**
 * parses log and settings modules
 * @param data - pass the file as string, Buffer or Arraybuffer.
 * @returns JSON object representing the parsed data
 */

export function parseLogAndSettings(
  lines: string[],
  technique: string,
): ComplexObject {
  // file converted to an array of strings, each item a newline.

  let result: ComplexObject = {
    settings: { variables: { technique, params: {} } },
    log: { variables: {} },
  };

  const regex = {
    nothing: /^\s*$/,
    keyValue: / : | :$/,
    multiline: /^[ \t]/,
  };

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    if (regex.nothing.test(currentLine)) {
      continue; //not necessary but might make it quicker
    } else if (regex.keyValue.test(currentLine)) {
      // eslint-disable-next-line prefer-named-capture-group
      let [key, val] = currentLine.split(/ :(.*)/);
      key = key.trim();
      val = val.trim();
      if (key === 'Cycle Definition') {
        /* Special key parsing */
        const [params, lastLineRead] = getParams(lines, ++i);
        result.settings.variables.params = params || {};
        i = lastLineRead;
        continue;
      } else if (regex.multiline.test(lines[i + 1])) {
        do {
          //just a few short text lines
          val.concat('\n', lines[++i]);
        } while (regex.multiline.test(lines[i + 1]));
      }
      const [newKey, logOrSettings, newVal] = normalizeKeyValue(key, val);
      result[logOrSettings].variables[newKey] = newVal;
    } else {
      const [theKey, logOrSettings, theValue] = normalizeFlag(
        currentLine.trim(),
      );
      result[logOrSettings].variables[theKey] = theValue || '';
    }
  }
  return result;
}
