import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { parseMPR, parseMPT } from '../index';

const testFiles = join(__dirname, 'data/all/geis');

describe('parse geis data', () => {
  it('parse geis data', () => {
    const mprBuffer = readFileSync(join(testFiles, 'geis.mpr'));
    const mptBuffer = readFileSync(join(testFiles, 'geis.mpt'));

    const mpr = parseMPR(mprBuffer);
    const variables = mpr.data.variables;

    const mpt = parseMPT(mptBuffer) as Required<ReturnType<typeof parseMPT>>;
    const mptVariables = mpt.data?.variables;
    expect(variables).toBeDefined();
    expect(mptVariables).toBeDefined();
    //console.log(variables, mptVariables);
  });
});
