import { VarsChild } from '../parseData';
/**
 * MPT returns I Range as a string, and it seems that the number
 * returned in the binary (MPR) parser maps to it.
 * This function does this mapping, which is not complete.
 * @link `[[id:unitsScale]]`
 * @param experData - pass only the I Range column (object)
 * @returns - the map to I Range as a string[]
 */
export function mapIRangeToMPT(experData: VarsChild): string[] {
  if (experData.label === 'I Range') {
    return experData.data.map((val) => unitsScale('I Range', val));
  } else {
    throw new Error('The label should be I Range');
  }
}

/**
 * maps numeric values in I range or unit to a string
 * it is important to keep the output as string,
 * because the numeric values are processed differently
 * */
function unitsScale(key: 'I Range' | 'Is_unit', val: number): string {
  if (key === 'I Range') {
    switch (val) {
      case 9:
        return '1 A';
      case 10:
        return '100 mA';
      case 11:
        return '10 mA';
      case 12:
        return '1 mA';
      case 13:
        return '100 µA';
      case 14:
        return '10 µA';
      case 15:
        return '1 µA';
      case 21:
        return '10 µA';
      case 22:
        return '1 µA';
      case 23:
        return '100 nA';
      case 24:
        return '10 nA';
      case 37:
        return '1 A';
      case 38:
        return '100 mA';
      case 39:
        return '10 mA';
      case 40:
        return '1 mA';
      default: //we don't yet have an interpretation for all values
        return val.toString(10);
    }
  }
  if (key === 'Is_unit') {
    switch (val) {
      case 0:
        return 'A';
      case 1:
        return 'mA';
      case 2:
        return 'µA';
      case 3:
        return 'nA';
      case 4:
        return 'pA';
      default: //we dont yet have interpretation for all values
        return key.toString();
    }
  }
  throw new Error('Error mapping Is_unit or I_range to value');
}
