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

  const measurements = [];

  for (let group of groups) {
    let mpt = group.mpt && parseMPT(await group.mpt.arrayBuffer());
    let mps = group.mps && parseMPS(await group.mps.arrayBuffer());
    let mpr = group.mpr && parseMPR(await group.mpr.arrayBuffer());
    // this is just some temporary code
    // we need to extract correct meta and check how mpt compares with mps

    measurements.push({ mpt, mps, mpr });
  }
  return measurements;
}
