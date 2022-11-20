import { OutParams, getParams } from '../utility/getParamsFromText';
import { normalizeFlag, normalizeKeyValue } from '../utility/normalize';
import type { Technique } from '../utility/techniqueFromId';

import { addKVToObject } from './utility/addKeyWithoutOverwrite';

export interface LogAndSettings {
  settings: {
    variables: {
      //similar to the ParseSettings of MPR format
      technique: string;
      params: OutParams;
      flags: string[];
      /* looking for a better definition */
      [key: string]: any;
    };
  };
  log: {
    variables: {
      flags: string[];
      /* looking for a better definition */
      [key: string]: any;
    };
  };
}

/**
 * Parses log and settings modules of text files
 * @param lines - file as string[]
 * @param technique - the technique being processed,
 * used to format the parameters to MPR format
 * @returns JSON object representing the parsed data
 */
export function parseLogAndSettings(
  lines: string[],
  technique: Technique,
): LogAndSettings {
  const result: LogAndSettings = {
    settings: {
      variables: {
        technique: technique.name,
        params: {},
        flags: [],
      },
    },
    log: {
      variables: {
        flags: [],
      },
    },
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

      addKVToObject(result[logOrSettings].variables, newKey, newVal);
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
