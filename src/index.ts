import { PartialFile } from 'filelist-from';

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
  const groups = groupFileList(fileList);//each item in the array a directory

  let measurements = [];

  for (let exp of groups) {
    const mpt = exp.mpt && parseMPT(await exp.mpt.arrayBuffer());
    const mps = exp.mps && parseMPS(await exp.mps.arrayBuffer());
    const mpr = exp.mpr && parseMPR(await exp.mpr.arrayBuffer());
    // this is just some temporary code
    // we need to extract correct meta and check how mpt compares with mps

    measurements.push({ mpt, mps, mpr });
  }
  return measurements;
}
