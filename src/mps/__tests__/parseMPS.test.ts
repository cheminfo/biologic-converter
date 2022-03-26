import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPS } from '../parseMPS';

describe('parseMPS', () => {
  it('test', () => {
    const arrayBuffer = readFileSync(
      join(__dirname, '../../__tests__/data/test/test.mps'),
    );
    const result = parseMPS(arrayBuffer);
    console.log(result);
    //    expect(Object.keys(result)).toHaveLength(18);
    //    expect(result).toMatchSnapshot();
  });
});
