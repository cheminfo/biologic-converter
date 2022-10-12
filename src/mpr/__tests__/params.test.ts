import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPR } from '../parseMPR';

const testFiles = './data';
const testFilesInRoot = '../../__tests__/data/';

// test a few different keys from each file,
describe('Compare the technique (settings only)', () => {
  it('ca meta', () => {
    const trueMeta = JSON.parse(
      readFileSync(
        join(__dirname, `${testFilesInRoot}/testDirectory/ca/ca-meta.json`),
        'utf8',
      ),
    );
    const trueParams = trueMeta.params[0];

    // we organize the data a bit differently
    const {
      settings: { variables },
    } = parseMPR(
      readFileSync(
        join(__dirname, `${testFilesInRoot}/testDirectory/ca/ca.mpr`),
      ),
    );
    const ourParams = variables.params;

    // First compara the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length);
    expect(ourParams.I_range).toBe(trueParams.I_range);
    expect(ourParams.eTransferred).toBe(trueParams.e_transferred);
    expect(ourParams.Ei).toBe(trueParams.Ei);

    // now compare settings keys
    expect(Object.keys(variables)).toHaveLength(
      Object.keys(trueMeta.settings).length + 1,
    ); // we store params inside variables
  });
  it('cp meta', () => {
    const trueMeta = JSON.parse(
      readFileSync(
        join(__dirname, `${testFilesInRoot}/compareParsers/cp-meta.json`),
        'utf8',
      ),
    );
    const trueParams = trueMeta.params[0];

    // we organize the data a bit differently
    const {
      settings: { variables },
    } = parseMPR(
      readFileSync(join(__dirname, `${testFilesInRoot}/compareParsers/cp.mpr`)),
    );
    const ourParams = variables.params;

    // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length);

    // now compare settings keys
    expect(Object.keys(variables)).toHaveLength(
      Object.keys(trueMeta.settings).length + 1,
    ); // we store params inside variables
    expect(variables).toMatchSnapshot();
  });

  it('cp params', () => {
    const trueMeta = JSON.parse(
      readFileSync(
        join(__dirname, `${testFilesInRoot}/compareParsers/cp-meta.json`),
        'utf8',
      ),
    );
    const trueParams = trueMeta.params[0];

    // we organize the data a bit differently
    const {
      settings: { variables },
    } = parseMPR(
      readFileSync(join(__dirname, `${testFilesInRoot}/compareParsers/cp.mpr`)),
    );
    const ourParams = variables.params;

    // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length);
  });
  it('lsv params', () => {
    const trueMeta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/lsv-meta.json`), 'utf8'),
    );
    const trueParams = trueMeta.params[0];

    // we organize the data a bit differently
    const {
      settings: { variables },
    } = parseMPR(readFileSync(join(__dirname, `${testFiles}/lsv.mpr`)));
    const ourParams = variables.params;

    // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length);
  });

  it('zirParams', () => {
    const trueMeta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/zir-meta.json`), 'utf8'),
    );
    const trueParams = trueMeta.params[0];

    // we organize the data a bit differently
    const {
      settings: { variables },
    } = parseMPR(readFileSync(join(__dirname, `${testFiles}/zir.mpr`)));
    const ourParams = variables.params;

    // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length);
  });

  it('wait params', () => {
    //the python script fails w this file, here we only testing part of the parsing
    const trueMeta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/WAITmeta.json`), 'utf8'),
    );
    const trueParams = trueMeta.params[0];
    delete trueParams.technique;

    // we organize the data a bit differently
    const {
      settings: { variables },
    } = parseMPR(readFileSync(join(__dirname, `${testFiles}/wait.mpr`)));
    const ourParams = variables.params;
    // First compare the params key
    expect(ourParams).toMatchObject(trueParams);
  });
});
