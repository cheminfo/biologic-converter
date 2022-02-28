import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPT } from '../parseMPT';

describe('parseMPT', () => {
  it('test', async () => {
    const arrayBuffer = readFileSync(join(__dirname, 'data/test/test.mpt'));
    parseMPT(arrayBuffer);
  });
});
