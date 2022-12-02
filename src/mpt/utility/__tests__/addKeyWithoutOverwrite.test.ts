import type { LogAndSettings as PLS } from '../../parseLogAndSettings';
import { addKVToObject } from '../addKeyWithoutOverwrite';

describe('test both utilities', () => {
  it('addKVToObject', () => {
    const result: Pick<PLS, 'settings'> = {
      settings: {
        variables: {
          params: {},
          flags: [],
          technique: 'test',
          modified: [],
        },
      },
    };
    addKVToObject(result.settings.variables, 'Comment', 'test');
    expect(result.settings.variables.Comment).toBe('test');
    addKVToObject(result.settings.variables, 'Comment', 'test2');
    expect(result.settings.variables.Comment).toStrictEqual(['test', 'test2']);
    addKVToObject(result.settings.variables, 'Comment', 'test3');
    expect(result.settings.variables.Comment).toStrictEqual([
      'test',
      'test2',
      'test3',
    ]);
  });
});
