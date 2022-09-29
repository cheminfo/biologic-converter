import { MeasurementVariable, TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { ComplexObject } from '../Types';
import { parseMeta } from '../parseMeta';

export interface MPT {
  /* settings */
  meta: ComplexObject;
  /* body, i.e results */
  variables: Record<string, MeasurementVariable>;
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

  const header = headerMPT(lines.slice(0, 4));
  const i = parseInt(header['Nb header lines'], 10) - 2;
  return {
    meta: Object.assign(header, parseMeta(lines.slice(4, i))),
    variables: parseData(lines.slice(i + 1)),
  };
}

/**
 * Parse the values
 */
function parseData(data: string[]): MPT['variables'] {
  const variables: Record<string, MeasurementVariable> = {};

  let matrix = data.map((line) => line.split('\t'));

  const fields = matrix[0];

  matrix = matrix.slice(1);
  for (let i = 0; i < fields.length; i++) {
    const fieldName = fields[i];
    if (!fieldName.includes('/')) continue;
    variables[fieldName] = {
      label: fieldName.split('/')[0],
      units: fieldName.split('/')[1],
      isDependent: fieldName !== 'time/s',
      data: matrix.map((row) => Number(row[i])),
    };
  }
  return variables;
}

interface HeaderMPT {
  fileType: string;
  Technique: string;
  [other: string]: string;
}

function headerMPT(lines: string[]): HeaderMPT {
  const nOfLinesHeader = lines[1].split(' : ');
  return {
    fileType: lines[0],
    'Nb header lines': nOfLinesHeader[1].trim() || '',
    Technique: lines[3],
  };
}
