import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPT } from '../../mpt/parseMPT';
import { parseMPR } from '../parseMPR';

const testFiles = './data';

describe('parseMPR DATA', () => {
  const mprBuffer = readFileSync(join(__dirname, testFiles, 'zir.mpr'));
  const mptBuffer = readFileSync(join(__dirname, testFiles, 'zir.mpt'));

  const {
    data: { variables },
  } = parseMPR(mprBuffer);
  const {
    data: { variables: mptVariables },
  } = parseMPT(mptBuffer);
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
