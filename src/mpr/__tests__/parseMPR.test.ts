/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { IOBuffer } from 'iobuffer';

import { parseData, ParseHeader, parseMPR, ParseSettings } from '../parseMPR';

describe('parseMPR', () => {
  const arrayBuffer = readFileSync(
    join(__dirname, '../../__tests__/data/test/test.mpr'),
  );
  const buffer = new IOBuffer(arrayBuffer);
  it('header', () => {
    buffer.offset = 0x3a;
    const result = new ParseHeader(buffer);
    console.log(result);
  });
  it('data', () => {
    buffer.offset = 0x1a96;
    const header = new ParseHeader(buffer);
    const data = parseData(buffer, header);
    console.log(data);
  });
  it('settings', () => {
    buffer.offset = 0x6d;
    const settings = new ParseSettings(buffer);
    console.log(settings);
  });

  // THIS TEST OUTPUTS A FILE
  // eslint-disable-next-line jest/no-commented-out-tests

  it('wholeJson', () => {
    buffer.offset = 0x0;
    /*const parsed =*/ parseMPR(arrayBuffer);
    /*writeFileSync('whole.json', JSON.stringify(Object(parsed)), {
      encoding: 'utf8',
      flag: 'w',
    });*/
  });
});
