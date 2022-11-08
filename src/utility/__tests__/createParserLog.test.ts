import { createLogEntry } from '../createParserLog';

describe('createLogEntry', () => {
  it('no arguments', () => {
    const log = createLogEntry({});
    expect(log).toStrictEqual({
      parser: 'biologic-converter',
      kind: 'error',
      message: 'Error parsing biologic experiment.',
    });
  });
  it('error', () => {
    const log = createLogEntry({
      error: new Error('Help!'),
      relativePath: '/tmp/foo',
      parser: 'another-parser',
    });
    expect(log).toStrictEqual({
      parser: 'another-parser',
      kind: 'error',
      message: 'Error parsing biologic experiment.',
      relativePath: '/tmp/foo',
      error: new Error('Help!'),
    });
  });
});
