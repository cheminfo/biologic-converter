import { MeasurementVariable } from 'cheminfo-types';

import { dataColumnsByName } from '../utility/ids';

interface Data {
  [variableName: string]: MeasurementVariable;
}
/**
 * Parses the data from the MPT file
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
    const lowerCaseZ = 122;
    const oneLetter =
      lowerCaseZ - i > 96
        ? String.fromCharCode(122 - i)
        : String.fromCharCode(90 - (i % 26)); //we don't expect more than 52 variables
    const { name, unit } = mptNameToMPRName(fieldName);
    variables[oneLetter] = {
      label: name,
      units: unit,
      isDependent: fieldName !== 'time/s',
      data: matrix.map((row) => Number(row[i])),
    };
  }
  return variables;
}

function mptNameToMPRName(fieldName: string) {
  const mapToLabelUnit = dataColumnsByName[fieldName];
  if (mapToLabelUnit !== undefined) {
    return mapToLabelUnit;
  } else {
    const [name, unit] = fieldName.split('/') || [fieldName, ''];
    return { name, unit };
  }
}
