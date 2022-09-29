import { IOBuffer } from 'iobuffer';

export interface ParseLoop {
  numIndexes: number;
  indexes: number;
}

/*
 * Some files have a loop, this parses the loop
 * buffer - IOBuffer
 * @returns the header as a JSON-like object
 */
export function parseLoop(buffer: IOBuffer) {
  const object: Partial<ParseLoop> = {};
  object.numIndexes = buffer.readUint32();
  object.indexes = buffer.readUint32();
  return object as ParseLoop;
}
