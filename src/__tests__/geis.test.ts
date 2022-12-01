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

    //variables may have != length. Reason: software processing (they can, for example, calculate Q from I and only add it to text file. Binary is not changed.)
    expect(Object.keys(variables).length).toBeLessThanOrEqual(
      Object.keys(mptVariables).length,
    );
    expect(variables.a.data).toHaveLength(mptVariables.a.data.length);
    expect(variables.a.data[123]).toBeCloseTo(mptVariables.a.data[123]);
    expect(variables.b.label).toBe(mptVariables.b.label);
  });
});
