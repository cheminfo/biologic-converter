import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { parseMPR } from '../parseMPR';

const data = join(__dirname, '/../../__tests__/data/all/');
// test a few different keys from each file,
describe('Compare the technique (settings only)', () => {
  it('ca meta', () => {
    const dir = join(data, 'ca');
    const trueMeta = JSON.parse(
      readFileSync(join(dir, 'ca-meta.json'), 'utf8'),
    );
    const trueParams = trueMeta.params[0];

    // we organize the data a bit differently
    const {
      settings: { variables },
    } = parseMPR(readFileSync(join(dir, 'ca.mpr')));
    const ourParams = variables.params;
    // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length);
    expect(ourParams['I Range']).toBe(trueParams.I_range);
    expect(ourParams.eTransferred).toBe(trueParams.e_transferred);
    expect(ourParams.Ei).toBe(trueParams.Ei);

    // now compare settings keys
    expect(Object.keys(variables)).toHaveLength(
      Object.keys(trueMeta.settings).length + 1,
    ); // we store params inside variables
  });
  it('cp meta', () => {
    const dir = join(data, 'cp');
    const trueMeta = JSON.parse(
      readFileSync(join(dir, 'cp-meta.json'), 'utf8'),
    );
    const trueParams = trueMeta.params[0];

    // we organize the data a bit differently
    const {
      settings: { variables },
    } = parseMPR(readFileSync(join(dir, 'cp.mpr')));
    const ourParams = variables.params;

    // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length);

    // now compare settings keys
    expect(Object.keys(variables)).toHaveLength(
      Object.keys(trueMeta.settings).length + 1,
    ); // we store params inside variables
    expect(variables).toMatchSnapshot();
  });

  it('lsv params', () => {
    const dir = join(data, 'lsv');
    const trueMeta = JSON.parse(
      readFileSync(join(dir, 'lsv-meta.json'), 'utf8'),
    );
    const trueParams = trueMeta.params[0];

    // we organize the data a bit differently
    const {
      settings: { variables },
    } = parseMPR(readFileSync(join(dir, 'lsv.mpr')));
    const ourParams = variables.params;
    // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length);
  });

  it('zirParams', () => {
    const dir = join(data, 'zir');
    const trueMeta = JSON.parse(
      readFileSync(join(dir, 'zir-meta.json'), 'utf8'),
    );
    const trueParams = trueMeta.params[0];

    // we organize the data a bit differently
    const {
      settings: { variables },
    } = parseMPR(readFileSync(join(dir, 'zir.mpr')));
    const ourParams = variables.params;

    // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length);
  });

  it('wait params', () => {
    const dir = join(data, 'wait');
    //the python script fails w this file, here we only testing part of the parsing
    const trueMeta = JSON.parse(
      readFileSync(join(dir, 'WAITmeta.json'), 'utf8'),
    );
    const trueParams = trueMeta.params[0];
    delete trueParams.technique;

    // we organize the data a bit differently
    const {
      settings: { variables },
    } = parseMPR(readFileSync(join(dir, 'wait.mpr')));
    const ourParams = variables.params;
    // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length);
  });
});
