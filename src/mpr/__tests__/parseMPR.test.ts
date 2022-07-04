import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPR } from '../parseMPR';

describe('parseMPR', () => {
  it('test', () => {
    const arrayBuffer = readFileSync(
      join(__dirname, '../../__tests__/data/test/test.mpr'),
    );
    const result = parseMPR(arrayBuffer);

    console.log(result);
  });
});
