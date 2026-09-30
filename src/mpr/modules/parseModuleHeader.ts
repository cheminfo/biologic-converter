import type { IOBuffer } from 'iobuffer';

export interface ModuleHeader {
  shortName: string;
  longName: string;
  length: number;
  version: number;
  date: string;
}
/** What a 32-bit length field reads when the real length follows it as 64 bits. */
const LENGTH_ESCAPE = 0xff_ff_ff_ff;

/**
 * Each file has modules with **header** and **body**, this parses the header.
 *
 * EC-Lab 11.5 and later write the body length as `0xFFFFFFFF` followed by the
 * real length as a 64-bit value. Taking the sentinel at face value lands the
 * body pointer eight bytes early — inside the module's ASCII date — so the
 * technique byte is read as the character `0` and the file is rejected as an
 * unknown technique.
 * @param buffer - IOBuffer
 * @returns the header as a JSON-like object
 */
export function parseModuleHeader(buffer: IOBuffer): ModuleHeader {
  const shortName = buffer.readUtf8(10).trim();
  const longName = buffer.readUtf8(25).trim();
  let length = buffer.readUint32(); // number of bytes
  if (length === LENGTH_ESCAPE) length = Number(buffer.readBigUint64());
  return {
    shortName,
    longName,
    length,
    version: buffer.readUint32(),
    date: buffer.readChars(8), //ascii
  };
}
