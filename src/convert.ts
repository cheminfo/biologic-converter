import { MPR, parseMPR } from './mpr/parseMPR';
import { MPS, parseMPS } from './mps/parseMPS';
import { MPT, parseMPT } from './mpt/parseMPT';
import { GroupFilesOptions, groupFiles } from './utils';
import { PartialFileList } from './Types';

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
 * convertBiologic function signature
 * takes filelist and options, returns a promise
 */
export type ConvertBiologic = (fl: PartialFileList | FileList, groupOpts?:GroupFilesOptions) => Promise<BioLogic[]> 

/**
 *  Parses BioLogic mpt, mps formats.
 *
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
 * @param fileList - `path/to/parent` or `path/to/any/child`. (See tree above.)
 * @param groupingOptions - How to group the files on each directory. Optional parameter.
 * Default: `{ idWithBasename: true, useExtension: true };`. See [[`GroupFilesOptions`]].
 * @returns  JSON object passing **child** directory; array of children if you pass a **parent**.
 */
export const convertBiologic: ConvertBiologic = async ( fileList, groupingOptions ) => {

  groupingOptions = groupingOptions || { idWithBasename: true, useExtension: true };

  const groups = groupFiles(
    fileList,
    groupingOptions,
  );

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
