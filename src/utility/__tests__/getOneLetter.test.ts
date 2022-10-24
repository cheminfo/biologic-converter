import { getOneLetter } from '../getOneLetter';

test('getOneLetter', () => {
  expect(getOneLetter(0)).toBe('z');
  expect(getOneLetter(1)).toBe('y');
  expect(getOneLetter(25)).toBe('a');
  expect(getOneLetter(26)).toBe('Z');
  expect(getOneLetter(27)).toBe('Y');
  expect(getOneLetter(51)).toBe('A');
  expect(() => getOneLetter(-1)).toThrow(
    'Expected positive number. Received -1',
  );
  expect(() => getOneLetter(52)).toThrow(
    'Expect i to be integer less than 52. Received 52',
  );
  expect(() => getOneLetter(53)).toThrow(
    'Expect i to be integer less than 52. Received 53',
  );
});
