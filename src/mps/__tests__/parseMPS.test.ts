import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPS } from '../parseMPS';

describe('parseMPS', () => {
  it('test', () => {
    const arrayBuffer = readFileSync(
      join(__dirname, '../../__tests__/data/test/test.mps'),
    );
    parseMPS(arrayBuffer);
  });
});
