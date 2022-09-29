import { IOBuffer } from 'iobuffer';
/**
 * Tests if the upcoming data is from a module or not
 * buffer - the IOBuffer object;
 * @returns boolean - true if module, false if not
 */
export function isModule(buffer: IOBuffer): boolean {
  if (buffer.length > buffer.offset + 6) {
    return buffer.readUtf8(6) === 'MODULE';
  }
  return false;
}
