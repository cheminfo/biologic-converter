import { IOBuffer } from 'iobuffer';

export function pascalString(buffer: IOBuffer): string {
  //does it need the encoding?
  const nBytes = buffer.readUint8(); //is prefixed by the length
  return new TextDecoder('windows-1252').decode(buffer.readBytes(nBytes));
}
