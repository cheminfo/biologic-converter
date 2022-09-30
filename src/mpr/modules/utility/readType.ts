import { IOBuffer } from 'iobuffer';

/**
 * Read dType bites
 * @param buffer
 * @param dType
 *
 * */
export function readType(buffer: IOBuffer, dType: string): number {
  switch (dType) {
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
