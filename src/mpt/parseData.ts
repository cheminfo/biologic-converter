import type { MeasurementVariable } from 'cheminfo-types';

import { dataColumnsByName } from '../utility/ids.ts';

type Data = Record<string, MeasurementVariable>;
/**
 * Parses the data from the MPT file, which is a matrix of data.
 *
 * Keyed by the column's label, the same way the MPR parser keys its own, so a
 * measurement can be compared between the two exports of one experiment.
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
    const { name, unit } = mptNameToMPRName(fieldName);
    const key = variables[name] === undefined ? name : `${name} (${i})`;
    variables[key] = {
      label: name,
      units: unit,
      isDependent: fieldName !== 'time/s',
      data: matrix.map((row) => Number(row[i])),
    };
  }
  return variables;
}

/**
 * Maps MPT column name to the ones in MPR file, or returns just formats it.
 * @param fieldName - the name of the column as it appears in the MPT file
 * @returns
 */
function mptNameToMPRName(fieldName: string) {
  const mapToLabelUnit = dataColumnsByName[fieldName];
  if (mapToLabelUnit !== undefined) {
    return mapToLabelUnit;
  } else {
    const [name, unit] = fieldName.split('/') || [fieldName, ''];
    return { name, unit };
  }
}
