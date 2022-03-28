import { readFileSync } from 'fs';
import { join } from 'path';

import { parseTechnique, parseMPS } from '../parseMPS';

describe('parseMPS', () => {
  it('test', () => {
    const arrayBuffer = readFileSync(
      join(__dirname, '../../__tests__/data/test/test.mps'),
    );

    //test a real file
    const result1 = parseMPS(arrayBuffer);
    expect(Object.keys(result1)).toHaveLength(19);

    //test an array
    const inputArray = ['key : val', 'w space : val', 'multiline :', ' this.'];
    const result2 = parseMPS(inputArray);
    expect(result2).toMatchObject({
      key: 'val',
      'w space': 'val',
      multiline: ' this.',
    });
  });

  it('parseTechnique', () => {
    const myLines = ['Technique', 'hello   world', 'key   value', ''];
    const result = parseTechnique(myLines, 0);
    expect(result[0]).toMatchObject({
      name: 'Technique',
      hello: 'world',
      key: 'value',
    });
    expect(result[1]).toBe(3);
  });
});
