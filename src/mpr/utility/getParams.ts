/**
 * EC-LAB TECHNIQUE PARAMS
 */
type Technique = string;
type ArraySS = [string, string][];
export function getParams(id: number): [Technique, ArraySS] {
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

export const caParams: ArraySS = [
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

export const cpParams: ArraySS = [
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

export const cvParams: ArraySS = [
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

export const gcplParams: ArraySS = [
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

export const lsvParams: ArraySS = [
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

export const waitParams: ArraySS = [
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

export const zirParams: ArraySS = [
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
