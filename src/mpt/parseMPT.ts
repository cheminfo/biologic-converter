import { MeasurementVariable, TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { techniqueFromLongName } from '../utility/techniqueFromLongName';

import { parseData } from './parseData';
import { LogAndSettings, parseLogAndSettings } from './parseLogAndSettings';
import { getNbOfHeaderLines } from './utility/getNbOfHeaderLines';

/**
 * some files may only store data
 */
export interface MPT {
  name?: string;
  nbOfHeaderLines?: number;
  /* settings module */
  settings?: LogAndSettings['settings'];
  /* log module */
  log?: LogAndSettings['log'];
  /* data module */
  data: { variables: Record<string, MeasurementVariable> };
}

/**
 * Parses BioLogic MPT (with or without the header, only data files)
 * @param data - as a string, Buffer, ArrayBuffer.
 * @returns JSON Object with parsed data
 */
export function parseMPT(data: TextData): MPT {
  const lines = ensureString(data, {
    encoding: 'windows-1252', //ascii
  }).split(/\r?\n/);

  let result: Partial<MPT> = {};

  const name = lines[0].trim();

  if (name === 'EC-Lab ASCII FILE') {
    const nbOfHeaderLines = getNbOfHeaderLines(lines[1]);
    const technique = techniqueFromLongName(lines[3].trim());

    const headerStartsIndex = 4;
    const headerEndsIndex = nbOfHeaderLines - 1;

    const { settings, log } = parseLogAndSettings(
      lines.slice(headerStartsIndex, headerEndsIndex - 1), //we don't want the last line
      technique,
    );
    const dataStartsIndex = nbOfHeaderLines - 1;
    // do not depend on `mode` because it is not always present
    const data = { variables: parseData(lines.slice(dataStartsIndex)) };

    result = { name, nbOfHeaderLines, log, settings, data };
  } else {
    //"data only" files
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('mode')) {
        result.data = { variables: parseData(lines.slice(i + 1)) };
        break;
      }
    }
  }
  // If no data there may be some problem in the MPT file.
  if (!result.data) {
    throw new Error('No data was found by the parser in the MPT file.');
  }
  return result as MPT;
}
