import { PartialFileList, groupFiles } from 'filelist-utils';

/*import { MPR, parseMPR } from './mpr/parseMPR';*/
import { MPR, parseMPR } from './mpr/parseMPR';
import { MPS, parseMPS } from './mps/parseMPS';
import { MPT, parseMPT } from './mpt/parseMPT';

export interface BioLogic {
  dir?: string;
  mpr?: MPR;
  mps?: MPS;
  mpt?: MPT;
  /*mpr?: MPR;*/
}

/**
 *  Parses BioLogic mpt, mps formats from multiple or single directories.
 *  The result contains an array of [[`BioLogic`]] `[{dir:'1', mps, mpt}, {dir:'2', mps, mpt},..]`
 *
 *  Project structure example:
 *
 *  ```text
 *├── parent
 *│  ├── child1
 *│  │  ├── jdb11-1.mpr
 *│  │  └── jdb11-1.mps
 *   ...
 *│  └── childN
 *│      ├── test.mpr
 *│      ├── test.mps
 *│      └── test.mpt
 *  ```
 *
 * @param fileList - `path/to/parent` or `path/to/any/child`. (See tree above.)
 * @returns  JSON object passing **child** directory; array of children if you pass a **parent**.
 */

export async function convert(fileList: PartialFileList): Promise<BioLogic[]> {
  const dirs = groupFiles(fileList);
  let results: BioLogic[] = [];

  /* can not use `forEach` and pass `async` functions */
  for (const dir of dirs) {
    let result: BioLogic = {};
    result.dir = dir.key;
    for (const dataFile of dir.fileList) {
      const fName = dataFile.name;
      if (fName.endsWith('.mps')) {
        result.mps = parseMPS(await dataFile.arrayBuffer());
      } else if (fName.endsWith('.mpt')) {
        result.mpt = parseMPT(await dataFile.arrayBuffer());
      } else if (fName.endsWith('.mpr')) {
        result.mpr = parseMPR(await dataFile.arrayBuffer());
      }
    }
    if(Object.keys(result).length > 1) { results.push(result);}
  }
  return results;
}
