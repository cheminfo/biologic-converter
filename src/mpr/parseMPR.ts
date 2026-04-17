import type { BinaryData } from 'cheminfo-types';
import { IOBuffer } from 'iobuffer';

import type { ParseData } from './modules/parseData.ts';
import { parseData } from './modules/parseData.ts';
import type { ParseLogs } from './modules/parseLogs.ts';
import { parseLogs } from './modules/parseLogs.ts';
import type { ParseLoop } from './modules/parseLoop.ts';
import { parseLoop } from './modules/parseLoop.ts';
import type { ModuleHeader } from './modules/parseModuleHeader.ts';
import { parseModuleHeader } from './modules/parseModuleHeader.ts';
import type { ParseSettings } from './modules/parseSettings.ts';
import { parseSettings } from './modules/parseSettings.ts';
import { isModule } from './utility/isModule.ts';

export interface MPR {
  name: string /** a string in the first line */;
  data: { header: ModuleHeader; variables: ParseData };
  settings: { header: ModuleHeader; variables: ParseSettings };
  log?: { header: ModuleHeader; variables: ParseLogs };
  loop?: { header: ModuleHeader; variables: ParseLoop };
}

/**
 * Parses binary `.mpr` files
 * @param mprData - The data itself.
 * @returns The data as a JSON-like object.
 */
export function parseMPR(mprData: BinaryData): MPR {
  const buffer = new IOBuffer(mprData);
  const mpr: Partial<MPR> = {
    name: buffer
      .readUtf8(0x34)
      // eslint-disable-next-line no-control-regex
      .replaceAll(/\u001A|\u0000/g, '')
      .trim(),
  };

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
