import { mapIRangeToMPT } from '../mapIRangeToMPT';

describe('mapIRangeToString', () => {
  it('should return the I Range as a string', () => {
    const experData = {
      units: 'A',
      label: 'I Range',
      data: [9, 10, 11, 12, 13, 14, 15, 21, 22, 23, 24, 37, 38, 39, 40],
      isDependent: false,
    };
    const result = mapIRangeToMPT(experData);
    expect(result).toStrictEqual([
      '1 A',
      '100 mA',
      '10 mA',
      '1 mA',
      '100 µA',
      '10 µA',
      '1 µA',
      '10 µA',
      '1 µA',
      '100 nA',
      '10 nA',
      '1 A',
      '100 mA',
      '10 mA',
      '1 mA',
    ]);
  });
  it('throws', () => {
    expect(() =>
      mapIRangeToMPT({
        label: 'hello',
        units: 'A',
        isDependent: false,
        data: [],
      }),
    ).toThrow('The label should be I Range');
  });
});
