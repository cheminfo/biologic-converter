import { MeasurementVariable, TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { ComplexObject } from '../Types';
import { techniqueFromLongName } from '../utility/techniqueFromLongName';

import { parseData } from './parseData';
import { parseLogAndSettings } from './parseLogAndSettings';
import { getNbOfHeaderLines } from './utility/getNbOfHeaderLines';

export interface MPT {
  name: string;
  nbOfHeaderLines: number;
  /* settings module */
  settings: { variables: ComplexObject };
  /* data module */
  data: { variables: Record<string, MeasurementVariable> };
  /* log module */
  log: { variables: ComplexObject };
}

/**
 * Parses BioLogic MPT files
 * @param data - as a string, Buffer, ArrayBuffer.
 * @returns JSON Object with parsed data
 */
export function parseMPT(data: TextData): MPT {
  const lines = ensureString(data, {
    encoding: 'latin1',
  }).split(/\r?\n/);

  const name = lines[0].trim(); //something like "MPT file"
  const nbOfHeaderLines = getNbOfHeaderLines(lines[1]);
  const technique = techniqueFromLongName(lines[3].trim()); //seems to be safe to assume for now (always in line 4)

  const offset = 4;
  const i = nbOfHeaderLines - 2;
  const { settings, log } = parseLogAndSettings(
    lines.slice(offset, i),
    technique,
  );
  return {
    name,
    nbOfHeaderLines,
    settings,
    log,
    data: { variables: parseData(lines.slice(i + 1)) },
  };
}
