import { MeasurementVariable, TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { techniqueFromLongName } from '../utility/techniqueFromLongName';

import { parseData } from './parseData';
import { LogAndSettings, parseLogAndSettings } from './parseLogAndSettings';
import { getNbOfHeaderLines } from './utility/getNbOfHeaderLines';

/**
 * Normally files contain all of the 5 keys, but some test files
 * found in ec-lab (and all of the ones stored as .txt files)
 * lack some formatting and most would not contain the header (only contain `data`)
 */
export interface MPT {
  name?: string;
  nbOfHeaderLines?: number;
  /* settings module */
  settings?: LogAndSettings['settings'];
  /* log module */
  log?: LogAndSettings['log'];
  /* data module */
  data?: { variables: Record<string, MeasurementVariable> };
}

/**
 * Parses BioLogic MPT and TXT files (TXT files are MPT files that only contain the data)
 * @param data - as a string, Buffer, ArrayBuffer.
 * @returns JSON Object with parsed data
 */
export function parseMPT(data: TextData): MPT {
  const lines = ensureString(data, {
    encoding: 'windows-1252', //i.e ascii
  }).split(/\r?\n/);

  if (lines.length === 0) {
    throw new Error('Empty file');
  }

  let result: MPT = {};
  //MPT File magic, if present then expect structures.
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
    const data = { variables: parseData(lines.slice(dataStartsIndex)) };

    result = { name, nbOfHeaderLines, log, settings, data };
  } else {
    //if no header or strange header still try to find the data
    let i = 0;
    while (i < lines.length) {
      if (lines[i].startsWith('mode')) {
        result.data = { variables: parseData(lines.slice(i + 1)) };
        break;
      }
    }
  }
  // If no data there may be some problem in the MPT file.
  const topLevelKeys = Object.keys(result);
  if (
    topLevelKeys.length === 0 ||
    (topLevelKeys.length === 1 && topLevelKeys[0] === 'name')
  ) {
    throw new Error('No data was found by the parser in the MPT file.');
  }
  return result;
}
