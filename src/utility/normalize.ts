import { camelCase } from './camelCase';
/**
 * @module
 * Tries to make MPS and MPT settings and log module
 * more similar to MPR.
 * It is very un-optimal, but there is no simple rule to convert them,
 * so the code uses regex.
 */
/**
 * This is just for guidance of what stuff being parsed should
 * go to logs.
 */
const logProperties = {
  flags: [
    //this is just a "startWith"
    'Command interpretor',
    'Internet server',
    'Turn to OCV between techniques',
    'Record Power',
    'CE vs. WE compliance',
    'EC-Lab for',
    'Average data every',
  ],
  keyValues: [
    'Run on channel',
    'Ewe ctrl range',
    'Address',
    'Saved on',
    'Device',
    'Filename',
  ],
};

//parse values that are numeric, either from logs or settings
const normalizeNumVal: Record<string, { type: string }> = {
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

export type NormalizeKeyValue = [
  string, //camelCase key
  'log' | 'settings', //where to put it
  string | number | { [key: string]: string | number }, //value
];
/**
 * Parse every key
 * Some keys we have to parse individually
 * others follow a pattern
 * @param key - key to parse
 * @param val - value to parse
 * @returns [camelKey, logOrSettings, value]
 */
export function normalizeKeyValue(key: string, val: string): NormalizeKeyValue {
  let newVal;
  // "individual" keys
  if (key.startsWith('Run on channel')) {
    const result = /(?<num>\d+) \(SN (?<serial>\d+)\)$/.exec(val);
    if (result?.groups) {
      newVal = {
        number: parseInt(result.groups.num, 10),
        serial: parseInt(result.groups.serial, 10),
      };
    }
  } else {
    // "patterned" keys
    const setting = normalizeNumVal[key];
    if (setting && val) {
      if (setting.type === 'minMaxRange') {
        const result =
          /min = (?<min>-?\d+\.?\d*) (?<minUnit>[a-zA-Z]+), max = (?<max>-?\d+\.?\d*) (?<maxUnit>[a-zA-Z]+)$/.exec(
            val,
          );
        if (result?.groups) {
          newVal = {
            min: parseFloat(result.groups.min),
            minUnit: result.groups.minUnit,
            max: parseFloat(result.groups.max),
            maxUnit: result.groups.maxUnit,
          };
        }
      } else if (setting.type === 'valueUnit') {
        const both = val.split(' ');
        if (both.length === 2) {
          newVal = { value: parseFloat(both[0]), unit: both[1] };
        }
      } else if (setting.type === 'number') {
        newVal = parseFloat(val);
      }
    }
  }

  return [
    camelCase(key),
    logProperties.keyValues.includes(key) ? 'log' : 'settings',
    newVal || val,
  ];
}

/**
 * similar for keys, but value will be '' and fixed later
 * @param flag
 * @returns
 */
export function normalizeFlag(flag: string): NormalizeKeyValue {
  const regex = {
    version: / (?<version>v\d{1,}(?:\.\d{1,})+) /,
    points: /every (?<points>\d+) points/,
  };
  let name;
  let regexType = 'version';
  //exec may return `null`
  if (flag.startsWith('Internet server')) {
    name = 'serverVersion';
  } else if (flag.startsWith('EC-Lab for')) {
    name = 'ecLabVersion';
  } else if (flag.startsWith('Command interpretor')) {
    name = 'interpreterVersion';
  } else if (flag.startsWith('Average data every')) {
    name = 'averagingPoints';
    regexType = 'points';
  }
  if (name && regexType === 'version') {
    const result = regex.version.exec(flag);
    const version = result?.groups?.version || '';
    return [name, 'log', version];
  } else if (name === 'averagingPoints') {
    const result = regex.points.exec(flag);
    const points = result?.groups?.points;
    return [name, 'log', points ? parseInt(points, 10) : ''];
  } else {
    return [flag, 'settings', ''];
  }
}
