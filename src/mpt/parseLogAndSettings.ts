import { ComplexObject } from '../Types';
import { getParams } from '../utility/getParamsFromText';
import { normalizeFlag, normalizeKeyValue } from '../utility/normalize';
import { Technique } from '../utility/techniqueFromId';
/**
 * Parses log and settings modules, which are mixed up in the
 * text files
 * @param lines - file as string[]
 * @param technique - the technique being processed
 * @returns JSON object representing the parsed data
 */
export function parseLogAndSettings(
  lines: string[],
  technique: Technique,
): ComplexObject {
  let result: ComplexObject = {
    settings: {
      variables: { technique: technique.name, params: {}, flags: [] },
    },
    log: { variables: { flags: [] } },
  };

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
      // eslint-disable-next-line prefer-named-capture-group
      let [key, val] = currentLine.split(/ :(.*)/);
      key = key.trim();
      val = val.trim();
      if (key === 'Cycle Definition') {
        /* Special key parsing */
        const [params, lastLineRead] = getParams(
          technique.preParameters,
          lines,
          ++i,
        );
        result.settings.variables.params = params || {};
        i = lastLineRead;
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
      if (theValue) {
        result[logOrSettings].variables[theKey] = theValue;
      } else {
        result[logOrSettings].variables.flags.push(theKey);
      }
    }
  }
  return result;
}
