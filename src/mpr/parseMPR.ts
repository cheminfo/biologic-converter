import { BinaryData } from 'cheminfo-types';
import { IOBuffer } from 'iobuffer';

export type MPR = IOBuffer;

export function parseMPR(arrayBuffer: BinaryData):MPR {
  return (new IOBuffer(arrayBuffer));
}
