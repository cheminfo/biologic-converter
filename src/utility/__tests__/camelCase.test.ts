import { expect, test } from 'vitest';

import { camelCase } from '../camelCase.ts';

test('camelCase', () => {
  expect(camelCase('helloWorld')).toBe('helloworld'); //single word
  expect(camelCase('hello world')).toBe('helloWorld');
  expect(camelCase('hello world 2')).toBe('helloWorld2');
  expect(camelCase('hello world 2 3')).toBe('helloWorld23');
  expect(camelCase(' hello world 2 3 4 ')).toBe('helloWorld234');
});
