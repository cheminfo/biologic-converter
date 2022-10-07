import { IOBuffer } from 'iobuffer';

export interface ModuleHeader {
  shortName: string;
  longName: string;
  length: number;
  version: number;
  date: string; //ascii
}
/**
 * Each file has modules with **headed** and **body**, this parses the header
 * @param buffer - IOBuffer
 * @returns the header as a JSON-like object
 */
export function parseModuleHeader(buffer: IOBuffer): ModuleHeader {
  const object: Partial<ModuleHeader> = {};
  object.shortName = buffer.readUtf8(10).trim();
  object.longName = buffer.readUtf8(25).trim();
  object.length = buffer.readUint32();//number of bytes
  object.version = buffer.readUint32();//2 versions
  object.date = buffer.readChars(8); //ascii
  return object as ModuleHeader;
}
