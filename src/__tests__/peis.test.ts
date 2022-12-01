import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { parseMPR, parseMPT } from '../index';

const testFiles = join(__dirname, 'data/all/peis');

describe('parse peis data', () => {
  it('parse peis data', () => {
    const mprBuffer = readFileSync(join(testFiles, 'peis.mpr'));
    const mptBuffer = readFileSync(join(testFiles, 'peis.mpt'));

    const mpr = parseMPR(mprBuffer);
    const variables = mpr.data.variables;

    const mpt = parseMPT(mptBuffer) as Required<ReturnType<typeof parseMPT>>;
    const mptVariables = mpt.data?.variables;
    expect(variables).toBeDefined();
    expect(mptVariables).toBeDefined();
    //console.log(variables, mptVariables);
  });
});
