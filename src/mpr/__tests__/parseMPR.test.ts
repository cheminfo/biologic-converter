/* eslint-disable no-console */
import { readFileSync } from 'fs';

import { IOBuffer } from 'iobuffer';

import { join } from 'path';

import { parseData, ParseHeader, parseMPR } from '../parseMPR';

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
});
