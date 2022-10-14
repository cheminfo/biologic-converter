import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPT } from '../../mpt/parseMPT';
import { parseMPR } from '../parseMPR';

const testFiles = './data';

describe('parseMPR DATA', () => {
  it('data', () => {
    const mprBuffer = readFileSync(join(__dirname, testFiles, 'zir.mpr'));
    const mptBuffer = readFileSync(join(__dirname, testFiles, 'zir.mpt'));

    const mpr = parseMPR(mprBuffer);

    const mpt = parseMPT(mptBuffer);
    expect(mpr.data.variables).toMatchObject(mpt.data.variables);
  });
});
