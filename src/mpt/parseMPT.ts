// This file is the header
import { MeasurementVariable, TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';
import { IOBuffer } from 'iobuffer';

import { DNested , MPS, parseMPS } from "../index";

export type MPTBody = Record<string, MeasurementVariable>

export interface MPT { 
  meta: MPS | { },
  variables: MPTBody | { }
}
export function parseMPT(arrayBuffer: TextData) {
  const lines = ensureString(arrayBuffer, {
    encoding: 'latin1',
  }).split(/\r?\n/);

  let i = 0;
  for (; i < lines.length; i++) {
    if (lines[i].startsWith('mode')) {
      break;
    }
  }

  const meta = i === 0 ? { } : parseMPS(lines.slice(0, i));
  const variables = i <= lines.length-1 ? parseData(lines.slice(i)): { };

  return { meta, variables };
}

export function parseData(data: string[]):MPTBody {
  let matrix = data.map((line) => line.split('\t'));

  const variables: MPTBody = { };

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
