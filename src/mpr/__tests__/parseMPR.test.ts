import { readFileSync } from 'fs';
import { join } from 'path';

import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { flagColumns, dataColumns } from '../ids';
import { parseMPR } from '../parseMPR';
import { addData } from '../utility/addData';

expect.extend({ toBeDeepCloseTo });

const testFiles = '../../__tests__/data/test';

describe('parseMPR', () => {

  it('caParams', () => {
    const caMeta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/CAmeta.json`)).toString(),
    );
    expect(caMeta.params[0]).toStrictEqual(
      JSON.parse(
        JSON.stringify(
          parseMPR(readFileSync(join(__dirname, `${testFiles}/ca.mpr`)))
            .settings.variables.params,
        ),
      ),
    );
  });
  it('cpParams', () => {
    //const;
    const meta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/CPmeta.json`)).toString(),
    );
    expect(meta.params[0]).toStrictEqual(
      JSON.parse(
        JSON.stringify(
          parseMPR(readFileSync(join(__dirname, `${testFiles}/cp.mpr`)))
            .settings.variables.params,
        ),
      ),
    );
  });
  it('cvParams', () => {
    const meta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/CVmeta.json`)).toString(),
    );
    expect(meta.params[0]).toStrictEqual(
      parseMPR(readFileSync(join(__dirname, `${testFiles}/cv.mpr`))).settings
        .variables.params,
    );
  });
  it('lsvParams', () => {
    const meta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/LSVmeta.json`)).toString(),
    );
    expect(meta.params[0]).toStrictEqual(
      parseMPR(readFileSync(join(__dirname, `${testFiles}/lsv.mpr`))).settings
        .variables.params,
    );
  });
  it('waitParams', () => {
    const meta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/WAITmeta.json`)).toString(),
    );
    expect(meta.params[0]).toStrictEqual(
      parseMPR(readFileSync(join(__dirname, `${testFiles}/wait.mpr`))).settings
        .variables.params,
    );
  });
  it('zirParams', () => {
    const meta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/ZIRmeta.json`)).toString(),
    );
    expect(meta.params[0]).toStrictEqual(
      parseMPR(readFileSync(join(__dirname, `${testFiles}/zir.mpr`))).settings
        .variables.params,
    );
  });
  // Convert yadg data file to our format of files
  function convertData(dataFile: Record<string, any>) {
    const data: Record<
      string,
      Record<string, Array<number | string> | string>
    > = { };
    let first = true;
    const flags = new Array<string>();
    const vars = new Array<string>();
    for (const flagKey of Object.keys(flagColumns)) {
      flags.push(flagColumns[Number(flagKey)][1]);
    }
    for (const colKey of Object.keys(dataColumns)) {
      vars.push(dataColumns[Number(colKey)][1]);
    }
    for (const dat of dataFile.steps[0].data) {
      for (const key of Object.keys(dat.raw)) {
        if (flags.includes(key) || vars.includes(key)) {
          if (data[key]===undefined) {
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
    return data;
  }

  it('data', () => {

    const arrayBuffer = readFileSync(join(__dirname, `${testFiles}/ca.mpr`));
    const parsed = parseMPR(arrayBuffer);

    const dataFile = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/ca_data.json`)).toString(),
    );

    const data = convertData(dataFile);

    expect(data).toBeDeepCloseTo(parsed.data.variables, 1);
  });
});

