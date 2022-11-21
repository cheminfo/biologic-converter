import { getOneLetter } from '../getOneLetter';

test('getOneLetter', () => {
  expect(getOneLetter(0)).toBe('a');
  expect(getOneLetter(1)).toBe('b');
  expect(getOneLetter(25)).toBe('z');
  expect(getOneLetter(26)).toBe('A');
  expect(getOneLetter(27)).toBe('B');
  expect(getOneLetter(51)).toBe('Z');
  expect(() => getOneLetter(-1)).toThrow('expected a positive number');
  expect(() => getOneLetter(52)).toThrow('expected a number less than 52');
});
