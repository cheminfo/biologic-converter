import { TextData, MeasurementVariable } from 'cheminfo-types';
import { ensureString } from 'ensure-string';
import { PartialFile } from 'filelist-from';

import { groupFileList } from './utils';
import { parseMPR } from './mpr/parseMPR';
import { parseMPS } from './mps/parseMPS';
import { parseMPT } from './mpt/parseMPT';

/**
 * Convert an array of files to an array of measurements
 * We will take care of grouping the measurements so we may process an unlimited number of them
 * @returns A very important number
 */
export async function convert(fileList: File[]|PartialFile[]): Promise<any> {
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

/**
 * @param binary - File to be parsed
 */
export function fromBiologic(binary: TextData) {
  const text = ensureString(binary, { encoding: 'latin1' });
  let lines = new LineReader(text);

  let header:string[] = []
  let data:string[] = [];

  while (lines.index<lines.length) {
  const thisLine = lines.readLine();
    if (thisLine.startsWith('mode')) {
      body = lines.readFromTo(lines.prevIndex)
      break
    }
    header.push(thisLine);
  }

  const meta = parseHeader(header);
  const variables = parseData(data);
  console.log(meta,variables)
  // let analysis = new Analysis({});
  // analysis.pushMeasurement(variables, { meta, dataType: 'IV analysis' });

  // return analysis;
}

/**
 * Parses MPS file or MPT file header
 * @param header - header lines in a string array
 * @returns object with keys & string values
 */
export function parseHeader(header: string[]) : Record<string,string>{
//  header = header.filter((line) => line);
  const meta: Record<string, string> = {};
  let currentKey = '';
  for (const line of header) {
    // key : value
    if (line.match(':')) {
      const kV = line.split(':');
      currentKey = kV[0].trim();
      const val = kV[1].trim()
      //replace value
      //currentKey = line.replace(/:.*/, '').trim();
      //after the :
      //const value = line.replace(/.*:/, '').trim();
        meta[currentKey] = val;
    } else {
