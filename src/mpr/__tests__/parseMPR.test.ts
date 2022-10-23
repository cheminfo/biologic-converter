import { readFileSync } from 'fs';
import { join } from 'path';

import { MPT, parseMPT } from '../../mpt/parseMPT';
import { parseMPR } from '../parseMPR';

const testFiles = './data';

describe('parseMPR DATA', () => {
  const mprBuffer = readFileSync(join(__dirname, testFiles, 'zir.mpr'));
  const mptBuffer = readFileSync(join(__dirname, testFiles, 'zir.mpt'));

  const mpr = parseMPR(mprBuffer);
  const variables = mpr.data.variables;

  const mpt = parseMPT(mptBuffer) as Required<MPT>;
  const mptVariables = mpt.data?.variables;
  it('time', () => {
    const mprTime = variables.u;
    const mptTime = mptVariables.u;
    expect(mprTime.data).toHaveLength(mptTime.data.length);
    expect(mptTime).toMatchObject(mprTime);
    expect(mprTime.data[0]).toBeCloseTo(mptTime.data[0], 5);
  });
  it('freq', () => {
    const mprFreq = variables.z;
    const mptFreq = mptVariables.z;
    expect(mprFreq.data).toHaveLength(mptFreq.data.length);
    expect(mprFreq.data[0]).toBeCloseTo(mptFreq.data[0], 3);
  });
  it('Re(Z)', () => {
    const mprRe = variables.y;
    const mptRe = mptVariables.y;
    expect(mprRe.data).toHaveLength(mptRe.data.length);
    expect(mprRe.data[0]).toBeCloseTo(mptRe.data[0], 2);
  });
  it('I Range', () => {
    const mprRe = variables.r;
    const mptRe = mptVariables.r;
    expect(mprRe.data).toHaveLength(mptRe.data.length);
    expect(mprRe.data[0]).toBeCloseTo(mptRe.data[0], 2);
  });
});
