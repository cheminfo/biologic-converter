import { getNbOfHeaderLines } from '../getNbOfHeaderLines';

describe('getNbOfHeaderLines', () => {
  it('should return the number of header lines', () => {
    const headerLine = 'Nb header lines : 10';
    const result = getNbOfHeaderLines(headerLine);
    expect(result).toBe(10);
  });
  it('NaN errors', () => {
    const headerLine = 'Nb header lines : unknown';
    expect(() => getNbOfHeaderLines(headerLine)).toThrow(
      'Can not find a numeric value for the number of lines. Aborting.',
    );
  });
  it('should throw an error if the line is not a header line', () => {
    const headerLine = 'random stuff';
    expect(() => getNbOfHeaderLines(headerLine)).toThrow(
      'Missing header line.',
    );
  });
});
