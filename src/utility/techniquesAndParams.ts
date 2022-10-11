/**
 * parameters for each currently parsed technique (several not implemented.)
 */

interface Param {
  name: string;
  mprReadType: string;
  mpsReadType: string;
  regexUnits?: RegExp; //to extract units from name
}
type TechniqueName = string;
type TechniquesToParams = Record<TechniqueName, Param[]>;

/**
 * the values are ordered in the way they appear both
 * in the binary and the text file,
 * they have been renamed to be more descriptive.
 */
export const preParamsLookUp: TechniquesToParams = {
  caParams: [
    {
      name: 'Ei',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: /Ei \((?<units>.*)\)/,
    },
    { name: 'Ei_vs', mprReadType: 'Uint8', mpsReadType: 'string' },
    {
      name: 'ti',
      mprReadType: 'Float32',
      mpsReadType: 'string',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'Imax', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'Imax_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'Imin', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'Imin_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'dQM', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'dQM_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'record', mprReadType: 'Uint8', mpsReadType: 'int|string' },
    { name: 'dI', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'dI_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'dQ', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'dQ_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    {
      name: 'dt',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dta',
      mprReadType: 'Float32',
      regexUnits: / \((?<units>.*)\)/,
      mpsReadType: 'float',
    },
    {
      name: 'E_range_min',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E_range_max',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'I_range', mprReadType: 'Uint8', mpsReadType: 'float|string' },
    { name: 'I_range_min', mprReadType: 'Uint8', mpsReadType: 'float|string' },
    { name: 'I_range_max', mprReadType: 'Uint8', mpsReadType: 'float|string' },
    { name: 'I_range_init', mprReadType: 'Uint8', mpsReadType: 'float|string' },
    { name: 'bandwidth', mprReadType: 'Uint8', mpsReadType: 'int' },
    { name: 'goto_Ns', mprReadType: 'Uint32', mpsReadType: 'int' },
    { name: 'nc_cycles', mprReadType: 'Uint32', mpsReadType: 'int' },
  ],
  cpParams: [
    { name: 'Is', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'Is_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'Is_vs', mprReadType: 'Uint8', mpsReadType: 'string' },
    {
      name: 'ts',
      mprReadType: 'Float32',
      mpsReadType: 'string',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'EM',
      mprReadType: 'Float32',
      mpsReadType: 'float|string',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'dQM', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'dQM_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'record', mprReadType: 'Uint8', mpsReadType: 'int|string' },
    { name: 'dEs', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'dts', mprReadType: 'Float32', mpsReadType: 'float' },
    {
      name: 'E_range_min',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E_range_max',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'I_range', mprReadType: 'Uint8', mpsReadType: 'IRange' },
    { name: 'bandwidth', mprReadType: 'Uint8', mpsReadType: 'int' },
    { name: 'goto_Ns', mprReadType: 'Uint32', mpsReadType: 'int' },
    { name: 'nc_cycles', mprReadType: 'Uint32', mpsReadType: 'int' },
  ],
  cvParams: [
    {
      name: 'Ei',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: /Ei \((?<units>.*)\)/,
    },
    { name: 'Ei_vs', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'dE/dt', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'dE/dt_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'E1', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'E1_vs', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'step_percent', mprReadType: 'Uint8', mpsReadType: 'int' },
    { name: 'N', mprReadType: 'Uint32', mpsReadType: 'int' },
    {
      name: 'E_range_min',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E_range_max',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'I_range', mprReadType: 'Uint8', mpsReadType: 'IRange' },
    { name: 'I_range_min', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'I_range_max', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'I_range_init', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'bandwidth', mprReadType: 'Uint8', mpsReadType: 'int' },
    {
      name: 'E2',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'E2_vs', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'nc_cycles', mprReadType: 'Uint32', mpsReadType: 'int' },
    { name: 'reverse_scan', mprReadType: 'Uint8', mpsReadType: 'int' },
    {
      name: 'Ef',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'Ef_vs', mprReadType: 'Uint8', mpsReadType: 'string' },
  ],
  gcplParams: [
    { name: 'set_I/C', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'Is', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'Is_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'Is_vs', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'N', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'I_sign', mprReadType: 'Uint8', mpsReadType: 'string' },
    {
      name: 't1',
      mprReadType: 'Float32',
      mpsReadType: 'string',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'I_range', mprReadType: 'Uint8', mpsReadType: 'IRange' },
    { name: 'bandwidth', mprReadType: 'Uint8', mpsReadType: 'int' },
    {
      name: 'dE1',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dt1',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'EM',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'tM',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'Im', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'Im_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'dI/dt', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'dI/dt_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    {
      name: 'E_range_min',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E_range_max',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'dq', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'dq_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    {
      name: 'dtq',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'dQM', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'dQM_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'dxM', mprReadType: 'Float32', mpsReadType: 'float' },
    {
      name: 'tR',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dER/dt',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dER',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dtR',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'EL',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'goto_Ns', mprReadType: 'Uint32', mpsReadType: 'int' },
    { name: 'nc_cycles', mprReadType: 'Uint32', mpsReadType: 'int' },
  ],
  lsvParams: [
    {
      name: 'tR',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dER/dt',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dER',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dtR',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'dE/dt', mprReadType: 'Float32', mpsReadType: 'float' },
    {
      name: 'dE/dt_unit',
      mprReadType: 'Uint8',
      mpsReadType: 'string',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'Ei',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'Ei_vs', mprReadType: 'Uint8', mpsReadType: 'string' },
    {
      name: 'EL',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'EL_vs', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'record', mprReadType: 'Uint8', mpsReadType: 'int|string' },
    { name: 'dI', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'dI_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    {
      name: 'tI',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'step_percent', mprReadType: 'Uint8', mpsReadType: 'int' },
    { name: 'N', mprReadType: 'Uint32', mpsReadType: 'int' },
    {
      name: 'E_range_min',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E_range_max',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'I_range', mprReadType: 'Uint8', mpsReadType: 'IRange' },
    { name: 'I_range_min', mprReadType: 'Uint8', mpsReadType: 'float|string' },
    { name: 'I_range_max', mprReadType: 'Uint8', mpsReadType: 'float|string' },
    { name: 'I_range_init', mprReadType: 'Uint8', mpsReadType: 'float|string' },
    { name: 'bandwidth', mprReadType: 'Uint8', mpsReadType: 'int' },
  ],
  waitParams: [
    { name: 'select', mprReadType: 'Uint8', mpsReadType: 'int' },
    {
      name: 'td',
      mprReadType: 'Uint32',
      mpsReadType: 'string',
      regexUnits: /(?<units>.*)/,
    },
    { name: 'from', mprReadType: 'Uint8', mpsReadType: 'int' },
    { name: 'tech_num', mprReadType: 'Uint8', mpsReadType: 'int' },
    {
      name: 'ole_date',
      mprReadType: 'Float32',
      mpsReadType: 'string',
      regexUnits: /(?<units>.*)/,
    },
    {
      name: 'ole_time',
      mprReadType: 'Float32',
      mpsReadType: 'string',
      regexUnits: /(?<units>.*)/,
    },
    { name: 'record', mprReadType: 'Uint8', mpsReadType: 'int|string' },
    {
      name: 'dE',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'dI', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'dI_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    {
      name: 'dt',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
  ],
  zirParams: [
    {
      name: 'E',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'E_vs', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'f', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'f_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    {
      name: 'Va',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'pw', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'Na', mprReadType: 'Uint32', mpsReadType: 'int' },
    {
      name: 'E_range_min',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E_range_max',
      mprReadType: 'Float32',
      mpsReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'I_range', mprReadType: 'Uint8', mpsReadType: 'IRange' },
    { name: 'bandwidth', mprReadType: 'Uint8', mpsReadType: 'int' },
    { name: 'comp_level', mprReadType: 'Uint8', mpsReadType: 'int' },
    { name: 'use_results', mprReadType: 'Uint8', mpsReadType: 'int' },
    { name: 'comp_mode', mprReadType: 'Uint8', mpsReadType: 'string' },
  ],
  mirParams: [
    { name: 'Ru', mprReadType: 'Float32', mpsReadType: 'float' },
    { name: 'Ru_unit', mprReadType: 'Uint8', mpsReadType: 'string' },
    { name: 'comp_level', mprReadType: 'Uint8', mpsReadType: 'int' },
    { name: 'comp_mode', mprReadType: 'Uint8', mpsReadType: 'string' },
  ],
};

/**
    - CA - Chronoamperometry / Chronocoulometry
    - CP - Chronopotentiometry
    - CV - Cyclic Voltammetry
    - GCPL - Galvanostatic Cycling with Potential Limitation
    - GEIS - Galvano Electrochemical Impedance Spectroscopy
    - LOOP - Loop
    - LSV - Linear Sweep Voltammetry
    - MB - Modulo Bat
    - OCV - Open Circuit Voltage
    - PEIS - Potentio Electrochemical Impedance Spectroscopy
    - WAIT - Wait
    - ZIR - IR compensation (PEIS)
*/
export interface TechniqueLookUp {
  name: string;
  preParameters: Param[];
}

export function techniqueFromId(id: number): TechniqueLookUp {
  switch (id) {
    case 0x4:
      return { name: 'GCPL', preParameters: preParamsLookUp.gcplParams };
    case 0x6:
      return { name: 'CV', preParameters: preParamsLookUp.cvParams };
    case 0xb:
      throw new Error(`Not implemented name: OCV`);
    case 0x18:
      return { name: 'CA', preParameters: preParamsLookUp.caParams };
    case 0x19:
      return { name: 'CP', preParameters: preParamsLookUp.cpParams };
    case 0x1c:
      return { name: 'WAIT', preParameters: preParamsLookUp.waitParams };
    case 0x1d:
      throw new Error(`Not implemented name: PEIS`);
    case 0x1e:
      throw new Error(`Not implemented name: GEIS`);
    case 0x32:
      return { name: 'ZIR', preParameters: preParamsLookUp.zirParams };
    case 0x6c:
      return { name: 'LSV', preParameters: preParamsLookUp.lsvParams };
    case 0x7f:
      throw new Error(`Not implemented name: MB`);
    default:
      throw new Error(`Not implemented name: unknown (0x${id.toString(16)})`);
  }
}

export function techniqueFromLongName(id: string): TechniqueLookUp {
  switch (id) {
    case 'Galvanostatic Cycling with Potential Limitation':
      return { name: 'GCPL', preParameters: preParamsLookUp.gcplParams };
    case 'Cyclic Voltammetry':
      return { name: 'CV', preParameters: preParamsLookUp.cvParams };
    case 'Open Circuit Voltage':
      throw new Error(`Not implemented name: OCV`);
    case 'Chronoamperometry / Chronocoulometry':
      return { name: 'CA', preParameters: preParamsLookUp.caParams };
    case 'Chronopotentiometry':
      return { name: 'CP', preParameters: preParamsLookUp.cpParams };
    case 'Wait':
      return { name: 'WAIT', preParameters: preParamsLookUp.waitParams };
    case 'Potentio Electrochemical Impedance Spectroscopy':
      throw new Error('Not implemented name: PEIS');
    case 'Galvano Electrochemical Impedance Spectroscopy':
      throw new Error('Not implemented name: GEIS');
    case 'IR compensation (ZIR)':
      return { name: 'ZIR', preParameters: preParamsLookUp.zirParams };
    case 'Linear Sweep Voltammetry':
      return { name: 'LSV', preParameters: preParamsLookUp.lsvParams };
    case 'Modulo Bat':
      throw new Error('Not implemented technique: MB');
    case 'Manual IR compensation': //this technique isn't listed anywhere else
      return { name: 'MIR', preParameters: preParamsLookUp.mirParams };
    default:
      throw new Error(`Unknown technique: ${id}`);
  }
}
