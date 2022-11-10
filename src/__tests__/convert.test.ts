import { readFileSync as rfs } from 'node:fs';
import { join } from 'node:path';

import { convert } from '../convert';

const testFiles = join(__dirname, 'data');

describe('test convert', () => {
  it('parse test mpr', async () => {
    const fc = rfs(join(testFiles, 'all', 'test', 'test.mpr'));
    const mpr = await convert(fc, 'mpr');
    expect(mpr?.mpr).toBeDefined();
  });

  it('parse test mpt', async () => {
    const fc = rfs(join(testFiles, 'all', 'test', 'test.mpt'));
    const mpt = await convert(fc, 'mpt');
    expect(mpt?.mpt).toBeDefined();
  });

  it('parse test mps', async () => {
    const fc = rfs(join(testFiles, 'all', 'test', 'test.mps'));
    const mps = await convert(fc, 'mps');
    expect(mps?.mps).toBeDefined();
  });

  it('parse not recognized file extension', async () => {
    const fc = rfs(join(testFiles, 'all', 'test', 'test.mps'));
    // @ts-expect-error
    await expect(convert(fc, 'txt')).rejects.toThrow(
      'File type not recognized',
    );
  });
});
