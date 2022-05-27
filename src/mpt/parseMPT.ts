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
 * @param arrayBuffer
 * @returns JSON Object with parsed data
 */
export function parseMPT(arrayBuffer: TextData): MPT {
  const lines = ensureString(arrayBuffer, {
    encoding: 'latin1',
  }).split(/\r?\n/);

  const header = headerMPT(lines.slice(0, 4));

  let i = 4;
  for (; i < lines.length; i++) {
    if (lines[i].startsWith('mode')) {
      break;
    }
  }

  return {
    meta: Object.assign(header, parseMeta(lines.slice(4, i))),
    variables: parseData(lines.slice(i)),
  };
}

/**
 * Parse the values
 */
export function parseData(data: string[]): MPT['variables'] {
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
      isDependent: fieldName === 'time/s' ? false : true,
      data: matrix.map((row) => Number(row[i])),
    };
  }
  return variables;
}

export interface HeaderMPT {
  fileType: string;
  Technique: string;
  [other: string]: string;
}

export function headerMPT(lines: string[]): HeaderMPT {
  const kV = lines[1].split(' : ');
  const k = kV[0];
  const v = kV[1] || '';
  return { fileType: lines[0], [k]: v, Technique: lines[3] };
}
