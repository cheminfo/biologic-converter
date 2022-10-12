import { MeasurementVariable } from 'cheminfo-types';

interface Data {
  [variableName: string]: MeasurementVariable;
}
/**
 * Parses the data from the MPT file
 * Data is ordered as a matrix, with a header being
 * the fields and body being the values.
 * @param data - string[] sliced where data starts
 * @returns - the data as an object, keys are the names of the data-fields
 */
export function parseData(data: string[]): Data {
  const variables: Data = {};

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
