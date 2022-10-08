import { camalize } from './camalize';
/**
 * The nummerical keys have to be parsed differently
 * We try for everything that is not a technique parameter first
 * Then we may need to extend
 */
type NormalizeNumVal = {
  [key: string]: { type: string };
};

const normalizeNumVal: NormalizeNumVal = {
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
  string | number | { [key: string]: string | number },
];
export function normalizeKeyValue(key: string, val: string): NormalizeKeyValue {
  let newVal;
  const setting = normalizeNumVal[key];
  if (setting && val) {
    if (setting.type === 'minMaxRange') {
      const result =
        /min = (?<min>.*) (?<minUnit>.*), max = (?<max>.*) (?<maxUnit>.*)$/.exec(
          val,
        );
      if (result?.groups) {
        newVal = {
          min: Number(result.groups.min) || '',
          minUnit: result.groups.minUnit || '',
          max: Number(result.groups.max) || '',
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
  return [camalize(key), newVal || val];
}
