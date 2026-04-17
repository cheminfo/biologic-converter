import type { IOBuffer } from 'iobuffer';

export interface ModuleHeader {
  shortName: string;
  longName: string;
  length: number;
  version: number;
  date: string;
}
/**
 * Each file has modules with **headed** and **body**, this parses the header
 * @param buffer - IOBuffer
 * @returns the header as a JSON-like object
 */
export function parseModuleHeader(buffer: IOBuffer): ModuleHeader {
  return {
    shortName: buffer.readUtf8(10).trim(),
    longName: buffer.readUtf8(25).trim(),
    length: buffer.readUint32(), // number of bytes
    version: buffer.readUint32(), // 2 versions
    date: buffer.readChars(8), //ascii
  };
}
