import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { MPT, parseMPT } from '../../mpt/parseMPT';
import { parseMPR } from '../parseMPR';

const testFiles = join(__dirname, '/../../__tests__/data/all/geis');

describe('parse geis data', () => {
  it('parse geis data', () => {
    const mprBuffer = readFileSync(join(testFiles, 'geis.mpr'));
    const mptBuffer = readFileSync(join(testFiles, 'geis.mpt'));

    const mpr = parseMPR(mprBuffer);
    const variables = mpr.data.variables;

    const mpt = parseMPT(mptBuffer) as Required<MPT>;
    const mptVariables = mpt.data?.variables;
    expect(variables).toBeDefined();
    expect(mptVariables).toBeDefined();
    console.log(variables, mptVariables);
  });
});
