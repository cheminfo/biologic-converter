import type { NormalizeKeyValue } from '../../utility/normalize';
import type { LogAndSettings } from '../parseLogAndSettings';

type LogOrSettingVarsObject =
  | LogAndSettings['settings']['variables']
  | LogAndSettings['log']['variables'];

export function addKVToObject(
  parentObject: LogOrSettingVarsObject,
  key: NormalizeKeyValue[0],
  val: NormalizeKeyValue[2],
): void {
  const foundVal = parentObject[key];
  if (foundVal === undefined) {
    parentObject[key] = val;
  } else if (typeof foundVal === 'string') {
    parentObject[key] = [foundVal, val];
  } else if (Array.isArray(foundVal)) {
    foundVal.push(val);
  }
}
