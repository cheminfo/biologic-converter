import type { BinaryData } from 'cheminfo-types';

import { parseMPR } from './mpr/parseMPR';
import { parseMPS } from './mps/parseMPS';
import { parseMPT } from './mpt/parseMPT';

type Extensions = 'mpr' | 'mpt' | 'mps';
export async function convert(data: BinaryData, extension: Extensions) {
  switch (extension) {
    case 'mps':
      return { mps: parseMPS(data) };
    case 'mpt':
      return { mpt: parseMPT(data) };
    case 'mpr':
      return { mpr: parseMPR(data) };
    default:
  }
}
