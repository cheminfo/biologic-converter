import { camelCase } from './camelCase';
/*
 * This module tries to make MPS and MPT more similar to MPR.
 * It is very un-optimal, but there is no simple rule to convert them,
 * so the code uses regex.
 */
/**
 * This is just for guidance of what stuff being parsed should
 * go to logs. May or may not be used as it is tricky to parse them.
 */
const logProperties = {
  flags: [
    //this is just a "startWith"
    'Command interpretor', //misspell in the source code
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

/**
 * camelCase keys always, and try to find value and units if applies
 * Apparently there are only strings, numbers and ranges as results
 */
type NormalizeKeyValue = [
  string,
  'log' | 'settings',
  string | number | { [key: string]: string | number },
];
/**
 * Parse every key
 * Some keys we have to parse fully manually (not as many) others follow
 * a pattern and can be included in the chain of if elses
 */
export function normalizeKeyValue(key: string, val: string): NormalizeKeyValue {
  let newVal;
  // fully manual keys
  if (key.startsWith('Run on channel')) {
    const result = /(?<num>.*) \(SN (?<serial>.*)\)$/.exec(val);
    if (result?.groups) {
      newVal = {
        number: parseInt(result.groups.num, 10) || '',
        serial: parseInt(result.groups.serial, 10) || '',
      };
    }
  } else {
    // systemized keys
    const setting = normalizeNumVal[key];
    if (setting && val) {
      if (setting.type === 'minMaxRange') {
        const result =
          /min = (?<min>.*) (?<minUnit>.*), max = (?<max>.*) (?<maxUnit>.*)$/.exec(
            val,
          );
        if (result?.groups) {
          newVal = {
            min: parseFloat(result.groups.min),
            minUnit: result.groups.minUnit || '',
            max: parseFloat(result.groups.max),
            maxUnit: result.groups.maxUnit || '',
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
  /* If a k-v does not fall in any category, still needs tweaking */
  const newKey = camelCase(key);
  return [
    newKey,
    logProperties.keyValues.includes(key) ? 'log' : 'settings',
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
  const regex = {
    version: / (?<version>v\d{1,}\.\d{1,}) /,
    points: /every (?<points>.*) points/,
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
