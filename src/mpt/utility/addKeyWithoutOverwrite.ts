import type { NormalizeKeyValue } from '../../utility/normalize';
import type { LogAndSettings } from '../parseLogAndSettings';

type ResultObj = LogAndSettings;

export function addKVToSettings(
  result: ResultObj,
  key: NormalizeKeyValue[0],
  val: NormalizeKeyValue[2],
): void {
  const foundVal = result.settings.variables[key];
  if (foundVal === undefined) {
    result.settings.variables[key] = val;
  } else if (typeof foundVal === 'string') {
    result.settings.variables[key] = [foundVal, val];
  } else if (Array.isArray(foundVal)) {
    (result.settings.variables[key] as Array<any>).push(val);
  }
}

export function addKVToLog(
  result: ResultObj,
  key: NormalizeKeyValue[0],
  val: NormalizeKeyValue[2],
): void {
  const foundVal = result.log.variables[key];
  if (foundVal === undefined) {
    result.log.variables[key] = val;
  } else if (typeof foundVal === 'string') {
    result.log.variables[key] = [foundVal, val];
  } else if (Array.isArray(foundVal)) {
    (result.log.variables[key] as Array<any>).push(val);
  }
}
