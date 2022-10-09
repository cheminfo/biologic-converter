import { FileCollection, groupFiles } from 'filelist-utils';

import { ComplexObject } from './Types';
import { MPR, parseMPR } from './mpr/parseMPR';
import { parseMPS } from './mps/parseMPS';
import { parseMPT } from './mpt/parseMPT';

/**
 * Text files have no type at the moment, but they
 * follow MPR as much as possible
 */
export interface Biologic {
  dir?: string;
  mpr?: MPR;
  mps?: ComplexObject;
  mpt?: ComplexObject;
}

/**
 *  Parses Biologic mpr, mpt, mps formats from multiple or single directories.
 *  The result contains an array of [[`Biologic`]] `[{dir:'1', mps, mpt}, {dir:'2', mps, mpt},..]`
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
 * @param fileCol - `path/to/parent` or `path/to/any/child`. (See tree above.)
 * @returns JSON object passing **child** directory; array of children if you pass a **parent**.
 */

export async function convert(fileCol: FileCollection): Promise<Biologic[]> {
  const dirs = groupFiles(fileCol);
  let results: Biologic[] = [];

  /* can not use `forEach` and pass `async` functions */
  for (const dir of dirs) {
    let result: Biologic = {};
    result.dir = dir.key;
    for (const dataFile of dir.fileCollection) {
      const fName = dataFile.name;
      if (fName.endsWith('.mps')) {
        result.mps = parseMPS(await dataFile.arrayBuffer());
        console.log(result.mps)
      } else if (fName.endsWith('.mpt')) {
        result.mpt = parseMPT(await dataFile.arrayBuffer());
        console.log(result.mpt)
      } else if (fName.endsWith('.mpr')) {
        result.mpr = parseMPR(await dataFile.arrayBuffer());
        console.log(result.mpr)
      }
    }
    if (Object.keys(result).length > 1) {
      results.push(result);
    }
  }
  return results;
}
