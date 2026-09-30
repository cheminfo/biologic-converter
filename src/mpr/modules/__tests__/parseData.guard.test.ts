import { IOBuffer } from 'iobuffer';
import { describe, expect, it } from 'vitest';

import { parseData } from '../parseData.ts';
import type { ModuleHeader } from '../parseModuleHeader.ts';

/** Where a version-11 module's records begin, relative to its body. */
const RECORDS_OFFSET = 0x3ef;

/**
 * Build the smallest version-11 data module that declares the given columns.
 * @param ids - the column ids it declares
 * @param records - how many records it claims
 * @param recordSize - how wide each record is assumed to be, in bytes
 * @returns the body, and a header describing it
 */
function moduleOf(
  ids: number[],
  records: number,
  recordSize: number,
): { buffer: IOBuffer; header: ModuleHeader } {
  const length = RECORDS_OFFSET + records * recordSize;
  const body = new IOBuffer(new ArrayBuffer(length));
  body.writeUint32(records);
  body.writeUint16(ids.length);
  for (const id of ids) body.writeUint16(id);
  body.offset = 0;
  return {
    buffer: body,
    header: {
      shortName: 'VMP data',
      longName: 'VMP data',
      length,
      version: 11,
      date: '09/24/26',
    },
  };
}

describe('the record-layout guard', () => {
  it('accepts a module whose columns account for every byte', () => {
    // One Float64 `time` column: 8 bytes a record.
    const { buffer, header } = moduleOf([0x04], 2, 8);

    const variables = parseData(buffer, header);

    expect(Object.keys(variables)).toStrictEqual(['time']);
    expect(variables.time.data).toHaveLength(2);
  });

  it('refuses a column id it does not know', () => {
    // An unknown id used to be skipped. Skipping consumes no bytes, so the
    // record is read too narrow and every field after it comes from the wrong
    // offset — and the module decodes into plausible numbers, not an error.
    const { buffer, header } = moduleOf([0x04, 0x9999], 2, 8);

    expect(() => parseData(buffer, header)).toThrow(
      'unknown column id 0x9999: refusing to guess the record layout',
    );
  });

  it('refuses a layout whose width disagrees with the declared length', () => {
    // The module leaves room for 8-byte records but declares a Float64 and a
    // Float32, which is 12.
    const { buffer, header } = moduleOf([0x04, 0x06], 2, 8);

    expect(() => parseData(buffer, header)).toThrow(
      /record layout does not fit the module/,
    );
  });

  it('counts one shared byte for all the flags of a record', () => {
    // Four flags plus a Float64 is 9 bytes a record, not 12.
    const { buffer, header } = moduleOf([0x1, 0x2, 0x3, 0x15, 0x04], 3, 9);

    const variables = parseData(buffer, header);

    expect(Object.keys(variables)).toStrictEqual([
      'mode',
      'ox/red',
      'error',
      'control changes',
      'time',
    ]);
  });
});
