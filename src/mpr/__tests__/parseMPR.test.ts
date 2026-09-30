import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import type { MPT } from '../../mpt/parseMPT.ts';
import { parseMPT } from '../../mpt/parseMPT.ts';
import { parseMPR } from '../parseMPR.ts';

const testFiles = join(__dirname, '/../../__tests__/data/all/zir');

describe('parse zir data', () => {
  const mprBuffer = readFileSync(join(testFiles, 'zir.mpr'));
  const mptBuffer = readFileSync(join(testFiles, 'zir.mpt'));

  const mpr = parseMPR(mprBuffer);
  const variables = mpr.data.variables;

  const mpt = parseMPT(mptBuffer) as Required<MPT>;
  const mptVariables = mpt.data?.variables;
  it('time', () => {
    const mprTime = variables.time;
    const mptTime = mptVariables.time;
    expect(mprTime.data).toHaveLength(mptTime.data.length);
    expect(mptTime).toMatchObject(mprTime);
    expect(mprTime.data[0]).toBeCloseTo(mptTime.data[0], 5);
  });
  it('freq', () => {
    const mprFreq = variables.freq;
    const mptFreq = mptVariables.freq;
    expect(mprFreq.data).toHaveLength(mptFreq.data.length);
    expect(mprFreq.data[0]).toBeCloseTo(mptFreq.data[0], 3);
  });
  it('Re(Z)', () => {
    const mprRe = variables['Re(Z)'];
    const mptRe = mptVariables['Re(Z)'];
    expect(mprRe.data).toHaveLength(mptRe.data.length);
    expect(mprRe.data[0]).toBeCloseTo(mptRe.data[0], 2);
  });
  it('I Range', () => {
    const mprRe = variables['I Range'];
    const mptRe = mptVariables['I Range'];
    expect(mprRe.data).toHaveLength(mptRe.data.length);
    expect(mprRe.data[0]).toBeCloseTo(mptRe.data[0], 2);
  });
});
