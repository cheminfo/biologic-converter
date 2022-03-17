import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPR } from '../parseMPR';

describe('parseMPR', () => {
  it('test', async () => {
    const arrayBuffer = readFileSync(
      join(__dirname, '../../__tests__/data/test/test.mpr'),
    );
    console.log(parseMPR(arrayBuffer))
  });
});
