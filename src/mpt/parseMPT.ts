// This file is the header
import { MeasurementVariable, TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

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
  const header = lines.slice(0, i);
  const data = lines.slice(i);

  const meta = parseHeader(header);
  console.log(meta);
  const variables = parseData(data);
}

function parseHeader(header: string[]) {
  header = header.filter((line) => line);
  const meta: Record<string, string> = {};
  let currentKey = '';
  for (let line of header) {
    if (/ : /.exec(line)) {
      currentKey = line.replace(/:.*/, '').trim();
      const value = line.replace(/.*?:/, '').trim();
      if (value) {
        meta[currentKey] = value;
      }
    } else {
      if (currentKey) {
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
