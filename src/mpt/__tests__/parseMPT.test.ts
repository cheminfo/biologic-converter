import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPT } from '../parseMPT';

describe('parseMPT', () => {
  it('test', () => {
    const arrayBuffer = readFileSync(
      join(__dirname, '../../__tests__/data/test/test.mpt'),
    );
    parseMPT(arrayBuffer);
  });
});
