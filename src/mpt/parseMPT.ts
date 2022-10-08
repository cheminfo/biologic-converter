import { MeasurementVariable, TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { ComplexObject } from '../Types';

import { parseData } from './parseData';
import { parseSettings } from './parseSettings';
import { getNbOfHeaderLines } from './utility/getNbOfHeaderLines';

export interface MPT {
  meta: { name: string; nbOfHeaderLines: number };
  /* settings module */
  settings: { variables: ComplexObject };
  /* data module */
  data: { variables: Record<string, MeasurementVariable> };
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
  const technique = lines[3]; //seems to be safe to assume for now (always in line 4)

  const offset = 4;
  const i = nbOfHeaderLines - 2;

  return {
    meta: { name, nbOfHeaderLines },
    settings: { variables: parseSettings(lines.slice(offset, i), technique) },
    data: { variables: parseData(lines.slice(i + 1)) },
  };
}
