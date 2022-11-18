import type { LogAndSettings as PLS } from '../../parseLogAndSettings';
import { addKVToLog, addKVToSettings } from '../addKeyWithoutOverwrite';

describe('test both utilities', () => {
  it('addKVToLog', () => {
    const result: PLS = {
      settings: {
        variables: {
          params: {},
          flags: [],
          technique: 'test',
        },
      },
      log: {
        variables: { flags: [] },
      },
    };
    addKVToLog(result, 'Comment', 'test');
    expect(result.log.variables.Comment).toBe('test');
    addKVToLog(result, 'Comment', 'test2');
    expect(result.log.variables.Comment).toStrictEqual(['test', 'test2']);
    addKVToLog(result, 'Comment', 'test3');
    expect(result.log.variables.Comment).toStrictEqual([
      'test',
      'test2',
      'test3',
    ]);
  });
  it('addKVToSettings', () => {
    const result: PLS = {
      settings: {
        variables: {
          technique: 'test',
          params: {},
          flags: [],
        },
      },
      log: {
        variables: { flags: [] },
      },
    };
    addKVToSettings(result, 'Comment', 'test');
    expect(result.settings.variables.Comment).toBe('test');
    addKVToSettings(result, 'Comment', 'test2');
    expect(result.settings.variables.Comment).toStrictEqual(['test', 'test2']);
    addKVToSettings(result, 'Comment', 'test3');
    expect(result.settings.variables.Comment).toStrictEqual([
      'test',
      'test2',
      'test3',
    ]);
  });
});
