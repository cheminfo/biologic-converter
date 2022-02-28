import { groupFileList } from './groupFileList';
import { parseMPR } from './mpr/parseMPR';
import { parseMPS } from './mps/parseMPS';
import { parseMPT } from './mpt/parseMPT';

/**
 * Convert an array of files to an array of measurements
 * We will take care of grouping the measurements so we may process an unlimited number of them
 * @returns A very important number
 */
export async function convert(fileList: File[]): Promise<any> {
  const groups = groupFileList(fileList);

  for (let group of groups) {
    if (group.mpt) {
      parseMPT(await group.mpt.arrayBuffer());
    }
    if (group.mps) {
      parseMPS(await group.mps.arrayBuffer());
    }
    if (group.mpr) {
      parseMPR(await group.mpr.arrayBuffer());
    }
  }
}
