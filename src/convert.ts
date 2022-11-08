import { FileCollection, groupFiles } from 'filelist-utils';

import { ComplexObject } from './Types';
import { MPR, parseMPR } from './mpr/parseMPR';
import { parseMPS } from './mps/parseMPS';
import { MPT, parseMPT } from './mpt/parseMPT';
import type { ParserLog } from './utility/createParserLog';
import { createLogEntry } from './utility/createParserLog';

/** each item in the data array */
interface Biologic {
  dir?: string;
  mpr?: MPR;
  mps?: ComplexObject;
  mpt?: MPT;
}
/**
 * Return object from parser, including information about
 * any errors, warnings or debug messages.
 */
interface Convert {
  data: Biologic[];
  logs: ParserLog[];
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
 * @returns JSON object with the biologic `data` array, and an array of logs.
 */
export async function convert(fileCol: FileCollection): Promise<Convert> {
  const dirs = groupFiles(fileCol);
  const results: Convert = { logs: [], data: [] };
  let errorCounter = 0;
  let filesParsed = 0;
  /* can not use `forEach` and pass `async` functions */
  for (const dir of dirs) {
    const result: Biologic = { dir: dir.key };
    for (const dataFile of dir.fileCollection) {
      const { relativePath: path, name } = dataFile;
      const buffer = await dataFile.arrayBuffer();
      try {
        if (name.endsWith('.mps')) {
          result.mps = parseMPS(buffer);
        } else if (name.endsWith('.mpt')) {
          result.mpt = parseMPT(buffer);
        } else if (name.endsWith('.mpr')) {
          result.mpr = parseMPR(buffer);
        } else {
          continue;
        }
        filesParsed += 1;
      } catch (error) {
        if (error instanceof Error) {
          results.logs.push(createLogEntry({ relativePath: path, error }));
          errorCounter += 1;
        }
      }
    }
    if (Object.keys(result).length > 1) {
      results.data.push(result);
    }
  }

  const message = `
  ${dirs.length} directories. 
  ${errorCounter} parsing errors. 
  ${filesParsed} files parsed.`;

  results.logs.push(createLogEntry({ kind: 'summary', message }));

  return results;
}
