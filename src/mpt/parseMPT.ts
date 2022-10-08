import { MeasurementVariable, TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { ComplexObject } from '../Types';
import { addKeyValueToResult } from '../utility/addKeyValueToResult';

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

  const settingsVars = parseMPTSettings(lines.slice(offset, i), technique);

  return {
    meta: { name, nbOfHeaderLines },
    settings: { variables: settingsVars },
    data: { variables: parseData(lines.slice(i + 1)) },
  };
}

/**
 * Parse the values
 */
function parseData(data: string[]): ComplexObject {
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

/**
 * Creates an mps object from an mps file
 * The output is similar, but not the same, than `MPR.settings`
 * MPS includes one or more techniques
 * We will know what this means when using it.
 *
 * @param data - pass the file as string, Buffer or Arraybuffer.
 * @returns JSON object representing the parsed data
 */

export function parseMPTSettings(
  lines: string[],
  technique: string,
): ComplexObject {
  // file converted to an array of strings, each item a newline.

  let result: ComplexObject = { technique, params: [] };

  const regex = {
    nothing: /^\s*$/,
    keyValue: / : | :$/,
    multiline: /^[ \t]/,
    table: /^\w.*\s{2,}-*\w+.*\s{4,}$/,
  };

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];

    if (regex.nothing.test(currentLine)) {
      continue;
    } else if (regex.keyValue.test(currentLine)) {
      //function updates the index bc some values are multiline
      [result, i] = addKeyValueToResult(
        result,
        lines,
        currentLine,
        regex,
        i,
        'MPT',
      );
    } else if (regex.table.test(currentLine)) {
      /* for not k : v */
      //regex.table
      const kV: string[] = currentLine.split(/\s{2,}/);
      const [key, val] = [kV[0].trim(), kV.slice(1).join('  ').trim()];
      result[key] = val;
    } else if (Array.isArray(result.flags)) {
      result.flags.push(currentLine);
    } else {
      result.flags = [currentLine];
    }
  }
  return result;
}
