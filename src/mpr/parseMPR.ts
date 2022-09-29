import { BinaryData } from 'cheminfo-types';
import { IOBuffer } from 'iobuffer';

import { parseData, Variables } from './modules/parseData';
import { ParseLogs, parseLogs } from './modules/parseLogs';
import { ParseLoop, parseLoop } from './modules/parseLoop';
import { ModuleHeader, parseModuleHeader } from './modules/parseModuleHeader';
import { parseSettings, ParseSettings } from './modules/parseSettings';
import { isModule } from './utility/isModule';

export type DataVariables = Variables;
/**
 * imagine the MPR file as a set of blocks or modules,
 * each with a header, and then the data.
 */
export interface MPR {
  name: string /** a string in the first line */;
  data: { header: ModuleHeader; variables: DataVariables };
  settings: { header: ModuleHeader; variables: ParseSettings };
  log?: { header: ModuleHeader; variables: ParseLogs };
  loop?: { header: ModuleHeader; variables: ParseLoop };
}

/**
 * Main function parsing the binary data from BioLogic tests
 * arrayBuffer - the data itself.
 * @returns the data as a JSON-like object.
 */
export function parseMPR(arrayBuffer: BinaryData): MPR {
  const buffer = new IOBuffer(arrayBuffer);
  let mpr: Partial<MPR> = {};

  // top level properties
  mpr.name = buffer
    .readUtf8(0x34)
    .replace(/\x1A|\x00/g, '')
    .trim();

  //file is header + modules flagged as "MODULE" before starts
  while (isModule(buffer)) {
    const header = parseModuleHeader(buffer); //this is added to the objects below
    const zero = buffer.offset;
    //header.longname flags the props in the module
    if (/settings/i.exec(header.longName)) {
      mpr.settings = { header, variables: parseSettings(buffer) };
    } else if (/data/i.exec(header.longName)) {
      mpr.data = { header, variables: parseData(buffer, header) };
    } else if (/log/i.exec(header.longName)) {
      mpr.log = { header, variables: parseLogs(buffer) };
    } else if (/loop/i.exec(header.longName)) {
      mpr.loop = { header, variables: parseLoop(buffer) };
    }
    buffer.offset = zero + header.length;
  }
  return mpr as MPR;
}
