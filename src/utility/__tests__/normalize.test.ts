import { normalizeFlag, normalizeKeyValue } from '../normalize';

describe('normalizeKeyValue', () => {
  it('Run on channel key-value pair', () => {
    const [key, type, value] = normalizeKeyValue(
      'Run on channel',
      '1 (SN 123456)',
    );
    expect(key).toBe('runOnChannel');
    expect(type).toBe('log');
    expect(value).toStrictEqual({ number: 1, serial: 123456 });
  });

  it('Numeric key value', () => {
    const [key, type, value] = normalizeKeyValue(
      'Number of linked techniques',
      '501',
    );
    expect(key).toBe('numberOfLinkedTechniques');
    expect(type).toBe('settings');
    expect(value).toBe(501);
  });

  it('value is a range like value', () => {
    const [key, type, value] = normalizeKeyValue(
      'Ewe ctrl range',
      ' min = 0.1 V, max = 0.2 V',
    );
    expect(key).toBe('eweCtrlRange');
    expect(type).toBe('log');
    expect(value).toStrictEqual({
      min: 0.1,
      max: 0.2,
      minUnit: 'V',
      maxUnit: 'V',
    });
  });

  it('normalize flags i.e not a key : value', () => {
    const [flag, type, val] = normalizeFlag('Internet server v11.32.0.0 ');
    expect(flag).toBe('serverVersion');
    expect(val).toBe('v11.32.0.0');
    expect(type).toBe('log');
  });

  it('average data', () => {
    const [flag, type, val] = normalizeFlag('Average data every 50 points');
    expect(flag).toBe('averagingPoints');
    expect(val).toBe(50);
    expect(type).toBe('log');
  });

  it('not individually parsed flag', () => {
    const [flag, type, val] = normalizeFlag('Record data');
    expect(flag).toBe('Record data');
    expect(val).toBe('');
    expect(type).toBe('settings');
  });
});
