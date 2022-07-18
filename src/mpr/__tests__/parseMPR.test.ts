/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { readFileSync, writeFileSync } from 'fs';
import fs from 'fs';
import { join } from 'path';

import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { flagColumns, dataColumns } from '../ids';
import { parseMPR, addData } from '../parseMPR';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

const testFiles = '../../__tests__/data/test';

describe('parseMPR', () => {
  /* TEST FILES READING */
  const arrayBuffer = readFileSync(join(__dirname, `${testFiles}/ca.mpr`));
  const parsed = parseMPR(arrayBuffer);
  /****/
  /* Write output to workspace root */
  fs.writeFileSync(join('.', 'whole.json'), JSON.stringify(parsed), {
    encoding: 'utf8',
    flag: 'w',
  });
  /****/

  it('caParams', () => {
    //const;
    const caMeta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/CAmeta.json`)).toString(),
    ); // Essayer de stringify puis reparser pour transformer NaN en null
    expect(caMeta.params[0]).toEqual(
      JSON.parse(
        JSON.stringify(
          parseMPR(readFileSync(join(__dirname, `${testFiles}/ca.mpr`)))
            .settings.values.params,
        ),
      ),
    );
  });
  it('cpParams', () => {
    //const;
    const meta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/CPmeta.json`)).toString(),
    );
    expect(meta.params[0]).toEqual(
      JSON.parse(
        JSON.stringify(
          parseMPR(readFileSync(join(__dirname, `${testFiles}/cp.mpr`)))
            .settings.values.params,
        ),
      ),
    );
  });
  it('cvParams', () => {
    //const;
    const meta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/CVmeta.json`)).toString(),
    );
    expect(meta.params[0]).toEqual(
      parseMPR(readFileSync(join(__dirname, `${testFiles}/cv.mpr`))).settings
        .values.params,
    );
  });
  it('lsvParams', () => {
    //const;
    const meta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/LSVmeta.json`)).toString(),
    );
    expect(meta.params[0]).toEqual(
      parseMPR(readFileSync(join(__dirname, `${testFiles}/lsv.mpr`))).settings
        .values.params,
    );
  });
  it('waitParams', () => {
    //const;
    const meta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/WAITmeta.json`)).toString(),
    );
    expect(meta.params[0]).toEqual(
      parseMPR(readFileSync(join(__dirname, `${testFiles}/wait.mpr`))).settings
        .values.params,
    );
  });
  it('zirParams', () => {
    //const;
    const meta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/ZIRmeta.json`)).toString(),
    );
    expect(meta.params[0]).toEqual(
      parseMPR(readFileSync(join(__dirname, `${testFiles}/zir.mpr`))).settings
        .values.params,
    );
  });
  it('data', () => {
    const dataFile = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/ca_data.json`)).toString(),
    );
    const data: Record<
      string,
      Record<string, Array<number | string> | string>
    > = {};
    let first = true;
    const flags = new Array<string>();
    const vars = new Array<string>();
    for (const truc of Object.keys(flagColumns)) {
      flags.push(flagColumns[Number(truc)][1]);
    }
    for (const truc of Object.keys(dataColumns)) {
      vars.push(dataColumns[Number(truc)][1]);
    }
    for (const dat of dataFile.steps[0].data) {
      for (const key of Object.keys(dat.raw)) {
        if (!Object.keys(data).includes(key)) {
          data[key] = {};
        }
        if (flags.includes(key)) {
          addData(Object(data[key]), dat.raw[key]);
          if (first) data[key].units = '';
        } else if (vars.includes(key)) {
          addData(Object(data[key]), dat.raw[key].n);
          if (first) {
            data[key].units = dat.raw[key].u;
            console.log(`${key} : ${dat.raw[key].n}`);
          }
        } else if (first) {
          data[key].units = '';
        }
        if (first) data[key].label = key;
      }
      first = false;
    }

    // Check if same data
    expect(data).toBeDeepCloseTo(parsed.data.values, 3);
  });
});
