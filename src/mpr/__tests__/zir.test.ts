import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { MPT, parseMPT } from '../../mpt/parseMPT';
import { parseMPR } from '../parseMPR';

const testFiles = join(__dirname, '/../../__tests__/data/all/zir');

describe('parse zir data', () => {
  const mprBuffer = readFileSync(join(testFiles, 'zir.mpr'));
  const mptBuffer = readFileSync(join(testFiles, 'zir.mpt'));

  const mpr = parseMPR(mprBuffer);
  const variables = mpr.data.variables;

  const mpt = parseMPT(mptBuffer) as Required<MPT>;
  const mptVariables = mpt.data?.variables;
  it('time', () => {
    const mprTime = variables.f;
    const mptTime = mptVariables.f;
    expect(mprTime.data).toHaveLength(mptTime.data.length);
    expect(mptTime).toMatchObject(mprTime);
    expect(mprTime.data[0]).toBeCloseTo(mptTime.data[0], 5);
  });
  it('freq', () => {
    const mprFreq = variables.a;
    const mptFreq = mptVariables.a;
    expect(mprFreq.data).toHaveLength(mptFreq.data.length);
    expect(mprFreq.data[0]).toBeCloseTo(mptFreq.data[0], 3);
  });
  it('Re(Z)', () => {
    const mprRe = variables.b;
    const mptRe = mptVariables.b;
    expect(mprRe.data).toHaveLength(mptRe.data.length);
    expect(mprRe.data[0]).toBeCloseTo(mptRe.data[0], 2);
  });
  it('I Range', () => {
    const mprRe = variables.g;
    const mptRe = mptVariables.g;
    expect(mprRe.data).toHaveLength(mptRe.data.length);
    expect(mprRe.data[0]).toBeCloseTo(mptRe.data[0], 2);
  });
});
