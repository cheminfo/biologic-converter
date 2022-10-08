import { MeasurementVariable } from 'cheminfo-types';

import { ComplexObject } from '../Types';
/**
 * Parse the values
 */
export function parseData(data: string[]): ComplexObject {
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
