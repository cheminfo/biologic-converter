interface FlagColumns {
  [key: number]: { bitMask: number; name: string };
}
/**
 * flag column ID bytes to the corresponding bitmask and name
 */
export const flagColumns: FlagColumns = {
  0x1: { bitMask: 0b00000011, name: 'mode' },
  0x2: { bitMask: 0b00000100, name: 'ox/red' },
  0x3: { bitMask: 0b00001000, name: 'error' },
  0x15: { bitMask: 0b00010000, name: 'control changes' },
  0x1f: { bitMask: 0b00100000, name: 'Ns changes' },
  0x41: { bitMask: 0b10000000, name: 'counter inc.' },
};

interface DataColumns {
  [key: number]: { dType: string; name: string; unit: string };
}
/**
 * data columns look-up table
 */
export const dataColumns: DataColumns = {
  0x4: { dType: 'Float64', name: 'time', unit: 's' },
  0x5: { dType: 'Float32', name: 'control_V/I', unit: 'V/mA' },
  0x6: { dType: 'Float32', name: 'Ewe', unit: 'V' },
  0x7: { dType: 'Float64', name: 'dq', unit: 'mA·h' },
  0x8: { dType: 'Float32', name: 'I', unit: 'mA' },
  0x9: { dType: 'Float32', name: 'Ece', unit: 'V' },
  0xb: { dType: 'Float64', name: '<I>', unit: 'mA' },
  0xd: { dType: 'Float64', name: '(Q-Qo)', unit: 'mA·h' },
  0x10: { dType: 'Float32', name: 'Analog IN 1', unit: 'V' },
  0x11: { dType: 'Float32', name: 'Analog IN 2', unit: 'V' },
  0x13: { dType: 'Float32', name: 'control_V', unit: 'V' },
  0x14: { dType: 'Float32', name: 'control_I', unit: 'mA' },
  0x17: { dType: 'Float64', name: 'dQ', unit: 'mA·h' },
  0x18: { dType: 'Float64', name: 'cycle number', unit: '' },
  0x20: { dType: 'Float32', name: 'freq', unit: 'Hz' },
  0x21: { dType: 'Float32', name: '|Ewe|', unit: 'V' },
  0x22: { dType: 'Float32', name: '|I|', unit: 'A' },
  0x23: { dType: 'Float32', name: 'Phase(Z)', unit: 'deg' },
  0x24: { dType: 'Float32', name: '|Z|', unit: 'Ω' },
  0x25: { dType: 'Float32', name: 'Re(Z)', unit: 'Ω' },
  0x26: { dType: 'Float32', name: '-Im(Z)', unit: 'Ω' },
  0x27: { dType: 'Uint16', name: 'I Range', unit: '' },
  0x46: { dType: 'Float32', name: 'P', unit: 'W' },
  0x4a: { dType: 'Float64', name: 'Energy', unit: 'W·h' },
  0x4b: { dType: 'Float32', name: 'Analog OUT', unit: 'V' },
  0x4c: { dType: 'Float32', name: '<I>', unit: 'mA' },
  0x4d: { dType: 'Float32', name: '<Ewe>', unit: 'V' },
  0x4e: { dType: 'Float32', name: 'Cs⁻²', unit: 'µF⁻²' },
  0x60: { dType: 'Float32', name: '|Ece|', unit: 'V' },
  0x62: { dType: 'Float32', name: 'Phase(Zce)', unit: 'deg' },
  0x63: { dType: 'Float32', name: '|Zce|', unit: 'Ω' },
  0x64: { dType: 'Float32', name: 'Re(Zce)', unit: 'Ω' },
  0x65: { dType: 'Float32', name: '-Im(Zce)', unit: 'Ω' },
  0x7b: { dType: 'Float64', name: 'Energy charge', unit: 'W·h' },
  0x7c: { dType: 'Float64', name: 'Energy discharge', unit: 'W·h' },
  0x7d: { dType: 'Float64', name: 'Capacitance charge', unit: 'µF' },
  0x7e: { dType: 'Float64', name: 'Capacitance discharge', unit: 'µF' },
  0x83: { dType: 'Uint16', name: 'Ns', unit: '' },
  0xa3: { dType: 'Float32', name: '|Estack|', unit: 'V' },
  0xa8: { dType: 'Float32', name: 'Rcmp', unit: 'Ω' },
  0xa9: { dType: 'Float32', name: 'Cs', unit: 'µF' },
  0xac: { dType: 'Float32', name: 'Cp', unit: 'µF' },
  0xad: { dType: 'Float32', name: 'Cp⁻²', unit: 'µF⁻²' },
  0xae: { dType: 'Float32', name: '<Ewe>', unit: 'V' },
  0xf1: { dType: 'Float32', name: '|E1|', unit: 'V' },
  0xf2: { dType: 'Float32', name: '|E2|', unit: 'V' },
  0x10f: { dType: 'Float32', name: 'Phase(Z1)', unit: 'deg' },
  0x110: { dType: 'Float32', name: 'Phase(Z2)', unit: 'deg' },
  0x12d: { dType: 'Float32', name: '|Z1|', unit: 'Ω' },
  0x12e: { dType: 'Float32', name: '|Z2|', unit: 'Ω' },
  0x14b: { dType: 'Float32', name: 'Re(Z1)', unit: 'Ω' },
  0x14c: { dType: 'Float32', name: 'Re(Z2)', unit: 'Ω' },
  0x169: { dType: 'Float32', name: '-Im(Z1)', unit: 'Ω' },
  0x16a: { dType: 'Float32', name: '-Im(Z2)', unit: 'Ω' },
  0x187: { dType: 'Float32', name: '<E1>', unit: 'V' },
  0x188: { dType: 'Float32', name: '<E2>', unit: 'V' },
  0x1a6: { dType: 'Float32', name: 'Phase(Zstack)', unit: 'deg' },
  0x1a7: { dType: 'Float32', name: '|Zstack|', unit: 'Ω' },
  0x1a8: { dType: 'Float32', name: 'Re(Zstack)', unit: 'Ω' },
  0x1a9: { dType: 'Float32', name: '-Im(Zstack)', unit: 'Ω' },
  0x1aa: { dType: 'Float32', name: '<Estack>', unit: 'V' },
  0x1ae: { dType: 'Float32', name: 'Phase(Zwe-ce)', unit: 'deg' },
  0x1af: { dType: 'Float32', name: '|Zwe-ce|', unit: 'Ω' },
  0x1b0: { dType: 'Float32', name: 'Re(Zwe-ce)', unit: 'Ω' },
  0x1b1: { dType: 'Float32', name: '-Im(Zwe-ce)', unit: 'Ω' },
  0x1b2: { dType: 'Float32', name: '(Q-Qo)', unit: 'C' },
  0x1b3: { dType: 'Float32', name: 'dQ', unit: 'C' },
  0x1b9: { dType: 'Float32', name: '<Ece>', unit: 'V' },
  0x1ce: { dType: 'Float32', name: 'Temperature', unit: '°C' },
  0x1d3: { dType: 'Float64', name: 'Q charge/discharge', unit: 'mA·h' },
  0x1d4: { dType: 'Uint32', name: 'half cycle', unit: '' },
  0x1d5: { dType: 'Uint32', name: 'z cycle', unit: '' },
  0x1d7: { dType: 'Float32', name: '<Ece>', unit: 'V' },
  0x1d9: { dType: 'Float32', name: 'THD Ewe', unit: '%' },
  0x1da: { dType: 'Float32', name: 'THD I', unit: '%' },
  0x1dc: { dType: 'Float32', name: 'NSD Ewe', unit: '%' },
  0x1dd: { dType: 'Float32', name: 'NSD I', unit: '%' },
  0x1df: { dType: 'Float32', name: 'NSR Ewe', unit: '%' },
  0x1e0: { dType: 'Float32', name: 'NSR I', unit: '%' },
  0x1e6: { dType: 'Float32', name: '|Ewe h2|', unit: 'V' },
  0x1e7: { dType: 'Float32', name: '|Ewe h3|', unit: 'V' },
  0x1e8: { dType: 'Float32', name: '|Ewe h4|', unit: 'V' },
  0x1e9: { dType: 'Float32', name: '|Ewe h5|', unit: 'V' },
  0x1ea: { dType: 'Float32', name: '|Ewe h6|', unit: 'V' },
  0x1eb: { dType: 'Float32', name: '|Ewe h7|', unit: 'V' },
  0x1ec: { dType: 'Float32', name: '|I h2|', unit: 'A' },
  0x1ed: { dType: 'Float32', name: '|I h3|', unit: 'A' },
  0x1ee: { dType: 'Float32', name: '|I h4|', unit: 'A' },
  0x1ef: { dType: 'Float32', name: '|I h5|', unit: 'A' },
  0x1f0: { dType: 'Float32', name: '|I h6|', unit: 'A' },
  0x1f1: { dType: 'Float32', name: '|I h7|', unit: 'A' },
  0x1f2: { dType: 'Float32', name: '|Ece h2|', unit: 'V' }, //-->Added f2 to f7 (not sure why they were missing.)
  0x1f3: { dType: 'Float32', name: '|Ece h7|', unit: 'V' },
  0x1f4: { dType: 'Float32', name: '|Ece h7|', unit: 'V' },
  0x1f5: { dType: 'Float32', name: '|Ece h7|', unit: 'V' },
  0x1f6: { dType: 'Float32', name: '|Ece h7|', unit: 'V' },
  0x1f7: { dType: 'Float32', name: '|Ece h7|', unit: 'V' },
};

/** maps numeric values in I range or unit to a string */
export function unitsScale(key: 'I_range' | 'Is_unit', val: number): string {
  if (key === 'I_range') {
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
      case undefined: //not sure whether this will be equivalent, just trying now
        return 'Auto';
      default:
        break;
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
      default:
        break;
    }
  }
  throw new Error('Error mapping Is_unit or I_range to value');
}
