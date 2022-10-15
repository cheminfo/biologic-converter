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

  let matrix = data.map((line) => line.trim().split('\t'));

  const fields = matrix[0];

  matrix = matrix.slice(1);
  for (let i = 0; i < fields.length; i++) {
    const fieldName = fields[i];
    if (fieldName === '') continue;
    const [key, val] = fieldName.split('/') || [fieldName, ''];
    variables[key] = {
      label: key,
      units: val,
      isDependent: fieldName !== 'time/s',
      data: matrix.map((row) => Number(row[i])),
    };
  }
  return variables;
}
