import { groupFileList } from './groupFileList';
import { parseMPT } from './parseMPT';

/**
 * Convert an array of files
 * @returns A very important number
 */
export async function convert(fileList: File[]): Promise<number> {
  const groups = groupFileList(fileList);

  for (let group of groups) {
    if (group.mpt) {
      parseMPT(group.mpt);
    }
    if (group.mps) {
      parseMPT(group.mps);
    }
    if (group.mpr) {
      parseMPT(group.mpr);
    }
  }
}
