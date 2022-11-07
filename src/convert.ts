import { FileCollectionItem } from 'filelist-utils';

import { parseMPR } from './mpr/parseMPR';
import { parseMPS } from './mps/parseMPS';
import { parseMPT } from './mpt/parseMPT';

export async function convert(file: FileCollectionItem) {
  if (file.name.endsWith('.mps')) {
    return { mps: parseMPS(await file.arrayBuffer()) };
  } else if (file.name.endsWith('.mpt')) {
    return { mpt: parseMPT(await file.arrayBuffer()) };
  } else if (file.name.endsWith('.mpr')) {
    return { mpr: parseMPR(await file.arrayBuffer()) };
  } else {
    return undefined;
  }
}
