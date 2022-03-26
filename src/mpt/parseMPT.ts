import { MeasurementVariable, TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { ComplexObject } from '../Types';
import { parseText, ParseText } from '../parseText';

export type MPTBody = Record<string, MeasurementVariable>;

export interface MPT {
  meta?: ComplexObject;
  variables?: MPTBody;
}

export type ParseMeta = (data: string[]) => ReturnType<ParseText>;
export const parseMeta: ParseMeta = (data: string[]) => parseText(data);

/**
 * Parses bioLogic MPT files
 * @param arrayBuffer
 * @returns JSON Object with parsed data
 */
export function parseMPT(arrayBuffer: TextData): MPT {
  const lines = ensureString(arrayBuffer, {
    encoding: 'latin1',
  }).split(/\r?\n/);

  let result: MPT = {};

  let i = 0; //to use in variables
  for (; i < lines.length; i++) {
    if (lines[i].startsWith('mode')) {
      break;
    }
  }

  const meta = parseMeta(lines.slice(0, i));
  const variables = parseData(lines.slice(i));

  if (meta) result.meta = meta;
  if (variables) result.variables = variables;

  return result;
}

/**
 * Parse the values
 */
export function parseData(data: string[]): MPTBody {
  let matrix = data.map((line) => line.split('\t'));

  const variables: MPTBody = {};

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
