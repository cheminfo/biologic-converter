import type { IOBuffer } from 'iobuffer';

export interface ParseLoop {
  numIndexes: number;
  indexes: number;
}

/*
 * Some files have a loop, this parses the loop
 * buffer - IOBuffer
 * @returns the header as a JSON-like object
 */
export function parseLoop(buffer: IOBuffer): ParseLoop {
  return {
    numIndexes: buffer.readUint32(),
    indexes: buffer.readUint32(),
  };
}
