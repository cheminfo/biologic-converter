/* eslint-disable @typescript-eslint/prefer-regexp-exec */
import { MeasurementVariable } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

//import { Analysis } from '../..';
/**
 * @param binary - File to be parsed
 */
export function fromBiologic(binary: string | ArrayBuffer | Uint8Array) {
  const text = ensureString(binary, { encoding: 'latin1' });
  const lines = text.split(/\r?\n/);
  let i = 0;
  for (; i < lines.length; i++) {
    if (lines[i].startsWith('mode')) {
      break;
    }
  }
  const header = lines.slice(0, i);
  const data = lines.slice(i);

  const meta = parseHeader(header);
  const variables = parseData(data);
  console.log(meta,variables)
  // let analysis = new Analysis({});
  // analysis.pushMeasurement(variables, { meta, dataType: 'IV analysis' });

  // return analysis;
}

/**
 * Parses MPS file or MPT file header
 * @param header - header lines in a string array
 * @returns object with keys & string values
 */
export function parseHeader(header: string[]) : Record<string,string>{
//  header = header.filter((line) => line);
  const meta: Record<string, string> = {};
  let currentKey = '';
  for (const line of header) {
    // key : value
    if (line.match(':')) {
      const kV = line.split(':'); 
      currentKey = kV[0].trim(); 
      const val = kV[1].trim()
      //replace value
      //currentKey = line.replace(/:.*/, '').trim();
      //after the :
      //const value = line.replace(/.*:/, '').trim();
        meta[currentKey] = val;
    } else {
      if (currentKey) {//for multiline 
        meta[currentKey] += `\n${line}`;
      }
    }
  }
  return meta;
}

function parseData(data: string[]) {
  let matrix = data.map((line) => line.split('\t'));

  const variables: Record<string, MeasurementVariable> = {};

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

  return {
    x: variables['I/mA'],
    y: variables['Ewe/V'],
    t: variables['time/s'],
  };
}
