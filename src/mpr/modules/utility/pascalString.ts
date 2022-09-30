import { IOBuffer } from 'iobuffer';

export function pascalString(buffer: IOBuffer): string {
  const length = buffer.readUint8();
  return buffer.readChars(length);
}
