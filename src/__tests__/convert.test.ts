import { readFileSync as rfs } from 'node:fs';
import { join } from 'node:path';

import { convert } from '../convert';

const testFiles = join(__dirname, 'data');

describe('test convert', () => {
  it('parse ca mpr', async () => {
    const fc = rfs(join(testFiles, 'all', 'ca', 'ca.mpr'));
    const mpr = await convert(fc, 'mpr');
    expect(mpr?.mpr).toBeDefined();
  });

  it('parse ca mpt', async () => {
    const fc = rfs(join(testFiles, 'all', 'ca', 'ca.mpt'));
    const mpt = await convert(fc, 'mpt');
    expect(mpt?.mpt).toBeDefined();
  });

  it('parse ca mps', async () => {
    const fc = rfs(join(testFiles, 'all', 'ca', 'ca.mps'));
    const mps = await convert(fc, 'mps');
    expect(mps?.mps).toBeDefined();
  });
});
