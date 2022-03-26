//import { TextData, MeasurementVariable } from 'cheminfo-types';
//import { ensureString } from 'ensure-string';

import { MPR, parseMPR } from './mpr/parseMPR';
import { MPS, parseMPS } from './mps/parseMPS';
import { MPT, parseMPT } from './mpt/parseMPT';
import { groupFiles } from './utils';

import { PartialFileList } from './index';

/**
 * Results of an experiment carried up by BioLogic
 */
export interface BioLogic {
  /** parsed settings file */
  mps?: MPS;
  /** parsed whole file */
  mpt?: MPT;
  /** parsed binary file */
  mpr?: MPR;
}

/**
 *  Parses BioLogic mpt, mps formats. Outputs result as a friendly JSON object.
 *  Imagine the following project structure:
 *
 *  ```text
 *├── parent
 *│  ├── child1
 *│  │  ├── jdb11-1.mpr
 *│  │  └── jdb11-1.mps
 *│  ├── child2
 *│  │  ├── jdb11-4.mpr
 *│  │  └── jdb11-4.mps
 *│  └── child3
 *│      ├── test.mpr
 *│      ├── test.mps
 *│      └── test.mpt
 *  ```
 *
 * @param fileList - `path/to/parent` or `path/to/any/child`.
 * @returns  a JSON object if you pass child directory; array of children if you pass a **parent**.
 */
export async function convertBioLogic(
  fileList: PartialFileList | FileList,
): Promise<BioLogic[]> {
  const gFLOptions = { idWithBasename: true, useExtension: true };
  const groups = groupFiles(
    fileList,
    gFLOptions,
  ); /* items in the same directory in an object */

  let measurements: BioLogic[] = [];

  for (const exp of groups) {
    let result: BioLogic = {};

    if (exp.mps) {
      result.mps = parseMPS(await exp.mps.arrayBuffer());
    }
    if (exp.mpt) {
      result.mpt = parseMPT(await exp.mpt.arrayBuffer());
    }
    if (exp.mpr) {
      result.mpr = parseMPR(await exp.mpr.arrayBuffer());
    }
    measurements.push(result);
  }

  return measurements;
}
