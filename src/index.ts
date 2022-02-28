import { groupFileList } from './groupFileList';
import { parseMPR } from './parseMPR';
import { parseMPS } from './parseMPS';
import { parseMPT } from './parseMPT';

/**
 * Convert an array of files to an array of measurements
 * We will take care of grouping the measurements so we may process an unlimited number of them
 * @returns A very important number
 */
export async function convert(fileList: File[]): Promise<any> {
  const groups = groupFileList(fileList);

  for (let group of groups) {
    if (group.mpt) {
      await parseMPT(group.mpt);
    }
    if (group.mps) {
      await parseMPS(group.mps);
    }
    if (group.mpr) {
      await parseMPR(group.mpr);
    }
  }
}
