import { camalize } from './camalize';
/**
 * The nummerical keys have to be parsed differently
 * We try for everything that is not a technique parameter first
 * Then we may need to extend
 */
type NormalizeNumVal = {
  [key: string]: { type: 'number'; splitAt: string };
};

const normalizeNumVal: NormalizeNumVal = {
  'Number of linked techniques': {
    type: 'number',
    splitAt: '',
  },
  /**"Ewe ctrl range": {
   name: "Ewe ctrl range",
   type:"number",
   splitAt:[" "]
},*/
  'Ewe,I filtering': {
    type: 'number',
    splitAt: ' ',
  },
  'Electrode surface area': {
    type: 'number',
    splitAt: ' ',
  },
  'Characteristic mass': {
    type: 'number',
    splitAt: ' ',
  },
  'Equivalent Weight': {
    type: 'number',
    splitAt: ' ',
  },
  Density: {
    type: 'number',
    splitAt: ' ',
  },
};

/**
 * camelCase keys always, and try to find value and units if applies
 */
type NormalizeKeyValue = [
  string,
  string | number | { [key: string]: string | number },
];
export function normalizeKeyValue(key: string, val: string): NormalizeKeyValue {
  let newVal;
  const setting = normalizeNumVal[key];
  if (setting) {
    //found
    console.log(key, setting);
    if (val && setting.splitAt === ' ') {
      const both = val.split(setting.splitAt);
      if (both.length === 2) {
        newVal = { value: Number(both[0]), unit: both[1] };
      }
    } else if (val && setting.splitAt === '') {
      newVal = Number(val);
    }
  } //no setting
  return [camalize(key), newVal || val];
}
