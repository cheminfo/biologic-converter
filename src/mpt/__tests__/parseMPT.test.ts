import { readFileSync } from 'fs';
import { join } from 'path';

import { ComplexObject } from '../../Types';
import { parseMPT, MPTBody } from '../parseMPT';

describe('parseMPT', () => {
  it('test', () => {
    const arrayBuffer = readFileSync(
      join(__dirname, '../../__tests__/data/test/test.mpt'),
    );
    const result = parseMPT(arrayBuffer);

    const meta = result.meta as ComplexObject;
    expect(Object.keys(meta)).toHaveLength(48);

    const vars = result.variables as MPTBody;
    expect(Object.keys(vars)).toHaveLength(18);

    //some props in meta
    expect(meta.Comments).toBe('');
    expect(meta.User).toBe('');
    expect(meta.flags).toHaveLength(5);

    //some props in vars
    expect(vars['Efficiency/%']).toMatchObject({
      label: 'Efficiency',
      units: '%',
      isDependent: true,
    });
  });
});
