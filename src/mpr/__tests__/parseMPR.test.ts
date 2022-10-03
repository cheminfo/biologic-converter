import { readFileSync } from 'fs';
import { join } from 'path';

import { flagColumns, dataColumns } from '../ids';
import { ParseData, VarsChild } from '../modules/parseData';
import { addData } from '../modules/utility/addData';
import { parseMPR } from '../parseMPR';

const testFiles = './data';

// Convert yadg data file to our format of files
function convertData(dataFile: Record<string, any>[]) {
  const data: Record<string, Partial<VarsChild>> = {};
  let first = true;
  const flags: string[] = [];
  const vars: string[] = [];

  for (const [, val] of Object.entries(flagColumns)) {
    flags.push(val.name);
  }
  for (const [, val] of Object.entries(dataColumns)) {
    vars.push(val.name);
  }
  for (const dat of dataFile) {
    for (const key of Object.keys(dat.raw)) {
      if (flags.includes(key) || vars.includes(key)) {
        if (data[key] === undefined) {
          data[key] = {};
        }
        if (typeof dat.raw[key] === 'object') {
          addData(data[key], dat.raw[key].n);
          if (first) {
            data[key].units = dat.raw[key].u;
          }
        } else {
          addData(data[key], dat.raw[key]);
          if (first) data[key].units = '';
        }
      } else {
        continue;
      }
      if (first) data[key].label = key;
    }
    first = false;
  }
  return data as ParseData;
}

describe('parseMPR', () => {
  it('data', () => {
    const arrayBuffer = readFileSync(join(__dirname, `${testFiles}/ca.mpr`));
    const parsed = parseMPR(arrayBuffer);

    const dataFile = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/ca-full.json`), 'utf-8'),
    );
    const data = convertData(dataFile);
    expect(data).toMatchObject(parsed.data.variables);
  });
});
