import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { parseMPR, parseMPT } from '../index';

const testFiles = join(__dirname, 'data/all/gcpl');

describe('parse gcpl data', () => {
  it('parse gcpl data', () => {
    const mprBuffer = readFileSync(join(testFiles, 'gcpl.mpr'));
    const mptBuffer = readFileSync(join(testFiles, 'gcpl.mpt'));

    const mpr = parseMPR(mprBuffer);
    const variables = mpr.data.variables;

    const mpt = parseMPT(mptBuffer) as Required<ReturnType<typeof parseMPT>>;
    const mptVariables = mpt.data?.variables;

    //console.log(mpr.settings, mpt.settings);
    //variables may have != length. Reason: software processing (they can, for example, calculate Q from I and only add it to text file. Binary is not changed.)
    expect(Object.keys(variables).length).toBeLessThanOrEqual(
      Object.keys(mptVariables).length,
    );
    expect(variables.a.data[123]).toBeCloseTo(mptVariables.a.data[123]);
    expect(variables.b.label).toBe(mptVariables.b.label);
  });
});
