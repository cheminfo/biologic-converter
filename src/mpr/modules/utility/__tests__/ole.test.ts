import { oleToUTCDate as oleToDate } from '../oleToDate';

test('oleToDate', () => {
  expect(oleToDate(0)).toEqual(new Date('1899-12-30T00:00:00.000Z'));
  expect(oleToDate(40967.6424503935)).toEqual(
    new Date('2/28/2012 15:25:07.713Z'),
  );
});
