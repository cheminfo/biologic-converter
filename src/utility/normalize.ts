import { camelCase } from './camelCase';

const logProperties = [
  'eweCtrlRange',
  'oleTimestamp',
  'filename',
  'savedOn',
  'host',
  'address',
  'ecLabVersion',
  'serverVersion',
  'interpreterVersion',
  'deviceSerial',
];

//this parses a bit better values that are numeric, for compatibility with MPR
const normalizeNumVal: Record<string, {type:string}> = {
  'Number of linked techniques': {
    type: 'number',
  },
  'Ewe ctrl range': {
    type: 'minMaxRange',
  },
  'Ewe,I filtering': {
    type: 'valueUnit',
  },
  'Electrode surface area': {
    type: 'valueUnit',
  },
  'Characteristic mass': {
    type: 'valueUnit',
  },
  'Equivalent Weight': {
    type: 'valueUnit',
  },
  Density: {
    type: 'valueUnit',
  },
};

/**
 * camelCase keys always, and try to find value and units if applies
 * Apparently there are only strings, numbers and ranges as results
 */
type NormalizeKeyValue = [
  string,
  'log' | 'settings',
  string | number | { [key: string]: string | number },
];
/** This function tries to solve a few problems:
 * First some key:val belong to the log object, some to settings
 */
export function normalizeKeyValue(key: string, val: string): NormalizeKeyValue {
  let newVal;
  if (key.startsWith('Run on channel')) {
    const [number, serial] = /(?:.*) \(SN (?:.*) \)/.exec(val) ?? '';
    return [
      'averagingPoints',
      'log',
      { number: Number(number) || '', serial: Number(serial) || '' },
    ];
  } 

const setting = normalizeNumVal[key];
if (setting && val) {
  if (setting.type === 'minMaxRange') {
    const result =
      /min = (?<min>.*) (?<minUnit>.*), max = (?<max>.*) (?<maxUnit>.*)$/.exec(
        val,
      );
    if (result?.groups) {
      newVal = {
        min: Number(result.groups.min),
        minUnit: result.groups.minUnit || '',
        max: Number(result.groups.max),
        maxUnit: result.groups.maxUnit || '',
      };
    }
  } else if (setting.type === 'valueUnit') {
    const both = val.split(' ');
    if (both.length === 2) {
      newVal = { value: Number(both[0]), unit: both[1] };
    }
  } else if (setting.type === 'number') {
    newVal = Number(val);
  }
}
const newKey = camelCase(key);
    return [
      newKey,
      logProperties.includes(newKey) ? 'log' : 'settings',
      newVal || val,
    ];
  }

/**
 * camelCase keys always, and try to find value and units if applies
 * Apparently there are only strings, numbers and ranges as results
 */
type NormalizeFlag = [
  string,
  'log' | 'settings',
  string | number | { [key: string]: string | number },
];
/**
 * Parses the keys that have no values, and normally the value is either
 * inside the key or it is just a boolean value
 * @param flag
 * @returns
 */
export function normalizeFlag(flag: string): NormalizeFlag {
  const regex = { version: / (?:v\d{1,}\.\d{1,}) / };
  if (flag.startsWith('Internet server')) {
    const [version] = regex.version.exec(flag) ?? '';
    return ['serverVersion', 'log', version || ''];
  } else if (flag.startsWith('EC-Lab for')) {
    const [version] = regex.version.exec(flag) ?? '';
    return ['ecLabVersion', 'log', version || ''];
  } else if (flag.startsWith('Command interpretor')) {
    const [version] = regex.version.exec(flag) ?? '';
    return ['interpreterVersion', 'log', version || ''];
  } else if (flag.startsWith('Average data every')) {
    const [points] = /every (?:.*) points/.exec(flag) ?? '';
    return ['averagingPoints', 'log', Number(points)];
  } else {
    return [flag, 'settings', ''];
  }
}
