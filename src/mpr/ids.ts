/**
 * DATA COLUMNS
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
};

/**
 * EC-LAB TECHNIQUE PARAMS
 */

export function getParams(id: number) {
  switch (id) {
    case 0x4:
      return ['GCPL', gcplParams];
    case 0x6:
      return ['CV', cvParams];
    case 0xb:
      throw new Error(`Not implemented technique: OCV`);
    case 0x18:
      return ['CA', caParams];
    case 0x19:
      return ['CP', cpParams];
    case 0x1c:
      return ['WAIT', waitParams];
    case 0x1d:
      throw new Error(`Not implemented technique: PEIS`);
    case 0x1e:
      throw new Error(`Not implemented technique: GEIS`);
    case 0x32:
      return ['ZIR', zirParams];
    case 0x6c:
      return ['LSV', lsvParams];
    case 0x7f:
      throw new Error(`Not implemented technique: MB`);
    default:
      throw new Error(
        `Not implemented technique: unknown (0x${id.toString(16)})`,
      );
  }
}

export const caParams = [
  ['Ei', 'Float32'],
  ['Ei_vs', 'Uint8'],
  ['ti', 'Float32'],
  ['Imax', 'Float32'],
  ['Imax_unit', 'Uint8'],
  ['Imin', 'Float32'],
  ['Imin_unit', 'Uint8'],
  ['dQM', 'Float32'],
  ['dQM_unit', 'Uint8'],
  ['record', 'Uint8'],
  ['dI', 'Float32'],
  ['dI_unit', 'Uint8'],
  ['dQ', 'Float32'],
  ['dQ_unit', 'Uint8'],
  ['dt', 'Float32'],
  ['dta', 'Float32'],
  ['E_range_min', 'Float32'],
  ['E_range_max', 'Float32'],
  ['I_range', 'Uint8'],
  ['I_range_min', 'Uint8'],
  ['I_range_max', 'Uint8'],
  ['I_range_init', 'Uint8'],
  ['bandwidth', 'Uint8'],
  ['goto_Ns', 'Uint32'],
  ['nc_cycles', 'Uint32'],
];

export const cpParams = [
  ['Is', 'Float32'],
  ['Is_unit', 'Uint8'],
  ['Is_vs', 'Uint8'],
  ['ts', 'Float32'],
  ['EM', 'Float32'],
  ['dQM', 'Float32'],
  ['dQM_unit', 'Uint8'],
  ['record', 'Uint8'],
  ['dEs', 'Float32'],
  ['dts', 'Float32'],
  ['E_range_min', 'Float32'],
  ['E_range_max', 'Float32'],
  ['I_range', 'Uint8'],
  ['bandwidth', 'Uint8'],
  ['goto_Ns', 'Uint32'],
  ['nc_cycles', 'Uint32'],
];

export const cvParams = [
  ['Ei', 'Float32'],
  ['Ei_vs', 'Uint8'],
  ['dE/dt', 'Float32'],
  ['dE/dt_unit', 'Uint8'],
  ['E1', 'Float32'],
  ['E1_vs', 'Uint8'],
  ['step_percent', 'Uint8'],
  ['N', 'Uint32'],
  ['E_range_min', 'Float32'],
  ['E_range_max', 'Float32'],
  ['I_range', 'Uint8'],
  ['I_range_min', 'Uint8'],
  ['I_range_max', 'Uint8'],
  ['I_range_init', 'Uint8'],
  ['bandwidth', 'Uint8'],
  ['E2', 'Float32'],
  ['E2_vs', 'Uint8'],
  ['nc_cycles', 'Uint32'],
  ['reverse_scan', 'Uint8'],
  ['Ef', 'Float32'],
  ['Ef_vs', 'Uint8'],
];

export const gcplParams = [
  ['set_I/C', 'Uint8'],
  ['Is', 'Float32'],
  ['Is_unit', 'Uint8'],
  ['Is_vs', 'Uint8'],
  ['N', 'Float32'],
  ['I_sign', 'Uint8'],
  ['t1', 'Float32'],
  ['I_range', 'Uint8'],
  ['bandwidth', 'Uint8'],
  ['dE1', 'Float32'],
  ['dt1', 'Float32'],
  ['EM', 'Float32'],
  ['tM', 'Float32'],
  ['Im', 'Float32'],
  ['Im_unit', 'Uint8'],
  ['dI/dt', 'Float32'],
  ['dI/dt_unit', 'Uint8'],
  ['E_range_min', 'Float32'],
  ['E_range_max', 'Float32'],
  ['dq', 'Float32'],
  ['dq_unit', 'Uint8'],
  ['dtq', 'Float32'],
  ['dQM', 'Float32'],
  ['dQM_unit', 'Uint8'],
  ['dxM', 'Float32'],
  ['tR', 'Float32'],
  ['dER/dt', 'Float32'],
  ['dER', 'Float32'],
  ['dtR', 'Float32'],
  ['EL', 'Float32'],
  ['goto_Ns', 'Uint32'],
  ['nc_cycles', 'Uint32'],
];

export const lsvParams = [
  ['tR', 'Float32'],
  ['dER/dt', 'Float32'],
  ['dER', 'Float32'],
  ['dtR', 'Float32'],
  ['dE/dt', 'Float32'],
  ['dE/dt_unit', 'Uint8'],
  ['Ei', 'Float32'],
  ['Ei_vs', 'Uint8'],
  ['EL', 'Float32'],
  ['EL_vs', 'Uint8'],
  ['record', 'Uint8'],
  ['dI', 'Float32'],
  ['dI_unit', 'Uint8'],
  ['tI', 'Float32'],
  ['step_percent', 'Uint8'],
  ['N', 'Uint32'],
  ['E_range_min', 'Float32'],
  ['E_range_max', 'Float32'],
  ['I_range', 'Uint8'],
  ['I_range_min', 'Uint8'],
  ['I_range_max', 'Uint8'],
  ['I_range_init', 'Uint8'],
  ['bandwidth', 'Uint8'],
];

export const waitParams = [
  ['select', 'Uint8'],
  ['td', 'Uint32'],
  ['from', 'Uint8'],
  ['tech_num', 'Uint8'],
  ['ole_date', 'Float32'],
  ['ole_time', 'Float32'],
  ['record', 'Uint8'],
  ['dE', 'Float32'],
  ['dI', 'Float32'],
  ['dI_unit', 'Uint8'],
  ['dt', 'Float32'],
];

export const zirParams = [
  ['E', 'Float32'],
  ['E_vs', 'Uint8'],
  ['f', 'Float32'],
  ['f_unit', 'Uint8'],
  ['Va', 'Float32'],
  ['pw', 'Float32'],
  ['Na', 'Uint32'],
  ['E_range_min', 'Float32'],
  ['E_range_max', 'Float32'],
  ['I_range', 'Uint8'],
  ['bandwidth', 'Uint8'],
  ['comp_level', 'Uint8'],
  ['use_results', 'Uint8'],
  ['comp_mode', 'Uint8'],
];

export const unitsScale: Record<
  string,
  Record<number, string> | Record<string, number>
> = {
  iRange: {
    9: '1 A',
    10: '100 mA',
    11: '10 mA',
    12: '1 mA',
    13: '100 µA',
    14: '10 µA',
    15: '1 µA',
    21: 'Auto',
    23: 'Auto',
    24: 'Auto',
    37: '1 A',
  },
  isUnit: {
    A: 0,
    mA: 1,
    µA: 2,
    nA: 3,
    pA: 4,
  },
};
