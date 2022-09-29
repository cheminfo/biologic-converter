import {IOBuffer} from "iobuffer";

/**
 * Read a certain number of bytes in a buffer using a type string
 * */
export function readType(buffer: IOBuffer, type: string): number {
  switch (type) {
    case 'Uint8':
      return buffer.readByte();
    case 'Uint16':
      return buffer.readUint16();
    case 'Uint32':
      return buffer.readUint32();
    case 'Float32':
      return buffer.readFloat32();
    case 'Float64':
      return buffer.readFloat64();
    default:
      return 0;
  }
}
