import { readFileSync as rfs } from 'node:fs';
import { join } from 'node:path';

import { parseMPR, parseMPT } from '../index';

const testFiles = join(__dirname, 'data/all/ca');
describe('parse CA file', () => {
  it('compare parsers ca.[mpt,mpr]', async () => {
    const mptFile = rfs(join(testFiles, 'ca.mpt'));
    const mprFile = rfs(join(testFiles, 'ca.mpr'));
    const mpt = parseMPT(mptFile)?.settings?.variables.params;
    const mpr = parseMPR(mprFile).settings.variables.params;
    expect(mpr.Imax).toBe('pass');
    expect(mpt?.Imax.value).toBe('pass');
  });
});
