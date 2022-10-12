import { BinaryData } from 'cheminfo-types';
import { IOBuffer } from 'iobuffer';

import { parseData, ParseData } from './modules/parseData';
import { parseLogs, ParseLogs } from './modules/parseLogs';
import { parseLoop, ParseLoop } from './modules/parseLoop';
import { parseModuleHeader, ModuleHeader } from './modules/parseModuleHeader';
import { parseSettings, ParseSettings } from './modules/parseSettings';
import { isModule } from './utility/isModule';

export interface MPR {
  name: string /** a string in the first line */;
  data: { header: ModuleHeader; variables: ParseData };
  settings: { header: ModuleHeader; variables: ParseSettings };
  log?: { header: ModuleHeader; variables: ParseLogs };
  loop?: { header: ModuleHeader; variables: ParseLoop };
}

/**
 * Parses binary `.mpr` files
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

  while (isModule(buffer)) {
    const header = parseModuleHeader(buffer); //this is added to the objects below
    const dataStart = buffer.offset;
    const dataLength = header.length;

    if (/settings/i.test(header.longName)) {
      mpr.settings = { header, variables: parseSettings(buffer) };
    } else if (/data/i.test(header.longName)) {
      mpr.data = { header, variables: parseData(buffer, header) };
    } else if (/log/i.test(header.longName)) {
      mpr.log = { header, variables: parseLogs(buffer) };
    } else if (/loop/i.test(header.longName)) {
      mpr.loop = { header, variables: parseLoop(buffer) };
    }
    buffer.offset = dataStart + dataLength; //end of module
  }
  return mpr as MPR;
}
