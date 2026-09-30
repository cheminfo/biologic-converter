import type { IOBuffer } from 'iobuffer';

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

/**
 * How many bytes a value of this type takes in a record.
 *
 * A record's width is the sum of its columns', and checking that sum against
 * the module's declared length is the only way to notice that a column was
 * misread — an unrecognised one consumes nothing and every field after it is
 * then read from the wrong offset.
 * @param dType - the type name as the id table spells it
 * @returns its width in bytes, or 0 when the type is unknown
 */
export function sizeOfType(dType: string): number {
  switch (dType) {
    case 'Uint8':
      return 1;
    case 'Uint16':
      return 2;
    case 'Uint32':
    case 'Float32':
      return 4;
    case 'Float64':
      return 8;
    default:
      return 0;
  }
}
