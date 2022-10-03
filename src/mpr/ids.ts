/**
 * DATA COLUMNS
 */
/**
 * flag column ID bytes to the corresponding bitmask and name
 */
export const flagColumns: { [key: number]: [number, string] } = {
  0x1: [0b00000011, 'mode'],
  0x2: [0b00000100, 'ox/red'],
  0x3: [0b00001000, 'error'],
  0x15: [0b00010000, 'control changes'],
  0x1f: [0b00100000, 'Ns changes'],
  0x41: [0b10000000, 'counter inc.'],
};

export const dataColumns: { [key: number]: string[] } = {
  0x4: ['Float64', 'time', 's'],
  0x5: ['Float32', 'control_V/I', 'V/mA'],
  0x6: ['Float32', 'Ewe', 'V'],
  0x7: ['Float64', 'dq', 'mA·h'],
  0x8: ['Float32', 'I', 'mA'],
  0x9: ['Float32', 'Ece', 'V'],
  0xb: ['Float64', '<I>', 'mA'],
  0xd: ['Float64', '(Q-Qo)', 'mA·h'],
  0x10: ['Float32', 'Analog IN 1', 'V'],
  0x11: ['Float32', 'Analog IN 2', 'V'],
  0x13: ['Float32', 'control_V', 'V'],
  0x14: ['Float32', 'control_I', 'mA'],
  0x17: ['Float64', 'dQ', 'mA·h'],
  0x18: ['Float64', 'cycle number', ''],
  0x20: ['Float32', 'freq', 'Hz'],
  0x21: ['Float32', '|Ewe|', 'V'],
  0x22: ['Float32', '|I|', 'A'],
  0x23: ['Float32', 'Phase(Z)', 'deg'],
  0x24: ['Float32', '|Z|', 'Ω'],
  0x25: ['Float32', 'Re(Z)', 'Ω'],
  0x26: ['Float32', '-Im(Z)', 'Ω'],
  0x27: ['Uint16', 'I Range', ''],
  0x46: ['Float32', 'P', 'W'],
  0x4a: ['Float64', 'Energy', 'W·h'],
  0x4b: ['Float32', 'Analog OUT', 'V'],
  0x4c: ['Float32', '<I>', 'mA'],
  0x4d: ['Float32', '<Ewe>', 'V'],
  0x4e: ['Float32', 'Cs⁻²', 'µF⁻²'],
  0x60: ['Float32', '|Ece|', 'V'],
  0x62: ['Float32', 'Phase(Zce)', 'deg'],
  0x63: ['Float32', '|Zce|', 'Ω'],
  0x64: ['Float32', 'Re(Zce)', 'Ω'],
  0x65: ['Float32', '-Im(Zce)', 'Ω'],
  0x7b: ['Float64', 'Energy charge', 'W·h'],
  0x7c: ['Float64', 'Energy discharge', 'W·h'],
  0x7d: ['Float64', 'Capacitance charge', 'µF'],
  0x7e: ['Float64', 'Capacitance discharge', 'µF'],
  0x83: ['Uint16', 'Ns', ''],
  0xa3: ['Float32', '|Estack|', 'V'],
  0xa8: ['Float32', 'Rcmp', 'Ω'],
  0xa9: ['Float32', 'Cs', 'µF'],
  0xac: ['Float32', 'Cp', 'µF'],
  0xad: ['Float32', 'Cp⁻²', 'µF⁻²'],
  0xae: ['Float32', '<Ewe>', 'V'],
  0xf1: ['Float32', '|E1|', 'V'],
  0xf2: ['Float32', '|E2|', 'V'],
  0x10f: ['Float32', 'Phase(Z1)', 'deg'],
  0x110: ['Float32', 'Phase(Z2)', 'deg'],
  0x12d: ['Float32', '|Z1|', 'Ω'],
  0x12e: ['Float32', '|Z2|', 'Ω'],
  0x14b: ['Float32', 'Re(Z1)', 'Ω'],
  0x14c: ['Float32', 'Re(Z2)', 'Ω'],
  0x169: ['Float32', '-Im(Z1)', 'Ω'],
  0x16a: ['Float32', '-Im(Z2)', 'Ω'],
  0x187: ['Float32', '<E1>', 'V'],
  0x188: ['Float32', '<E2>', 'V'],
  0x1a6: ['Float32', 'Phase(Zstack)', 'deg'],
  0x1a7: ['Float32', '|Zstack|', 'Ω'],
  0x1a8: ['Float32', 'Re(Zstack)', 'Ω'],
  0x1a9: ['Float32', '-Im(Zstack)', 'Ω'],
  0x1aa: ['Float32', '<Estack>', 'V'],
  0x1ae: ['Float32', 'Phase(Zwe-ce)', 'deg'],
  0x1af: ['Float32', '|Zwe-ce|', 'Ω'],
  0x1b0: ['Float32', 'Re(Zwe-ce)', 'Ω'],
  0x1b1: ['Float32', '-Im(Zwe-ce)', 'Ω'],
  0x1b2: ['Float32', '(Q-Qo)', 'C'],
  0x1b3: ['Float32', 'dQ', 'C'],
  0x1b9: ['Float32', '<Ece>', 'V'],
  0x1ce: ['Float32', 'Temperature', '°C'],
  0x1d3: ['Float64', 'Q charge/discharge', 'mA·h'],
  0x1d4: ['Uint32', 'half cycle', ''],
  0x1d5: ['Uint32', 'z cycle', ''],
  0x1d7: ['Float32', '<Ece>', 'V'],
  0x1d9: ['Float32', 'THD Ewe', '%'],
  0x1da: ['Float32', 'THD I', '%'],
  0x1dc: ['Float32', 'NSD Ewe', '%'],
  0x1dd: ['Float32', 'NSD I', '%'],
  0x1df: ['Float32', 'NSR Ewe', '%'],
  0x1e0: ['Float32', 'NSR I', '%'],
  0x1e6: ['Float32', '|Ewe h2|', 'V'],
  0x1e7: ['Float32', '|Ewe h3|', 'V'],
  0x1e8: ['Float32', '|Ewe h4|', 'V'],
  0x1e9: ['Float32', '|Ewe h5|', 'V'],
  0x1ea: ['Float32', '|Ewe h6|', 'V'],
  0x1eb: ['Float32', '|Ewe h7|', 'V'],
  0x1ec: ['Float32', '|I h2|', 'A'],
  0x1ed: ['Float32', '|I h3|', 'A'],
  0x1ee: ['Float32', '|I h4|', 'A'],
  0x1ef: ['Float32', '|I h5|', 'A'],
  0x1f0: ['Float32', '|I h6|', 'A'],
  0x1f1: ['Float32', '|I h7|', 'A'],
  0x1f2: ['Float32', '|Ece h2|', 'V'], //-->Added f2 to f7 (not sure why they were missing.)
  0x1f3: ['Float32', '|Ece h7|', 'V'],
  0x1f4: ['Float32', '|Ece h7|', 'V'],
  0x1f5: ['Float32', '|Ece h7|', 'V'],
  0x1f6: ['Float32', '|Ece h7|', 'V'],
  0x1f7: ['Float32', '|Ece h7|', 'V'],
};

/** This function maps numeric values in I range to a string */
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
