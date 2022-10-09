/**
 * parameters for each currently parsed technique (several not implemented.)
 */

export type ArraySS = [string, string][];
type ParamsLookUp = Record<string, ArraySS>;

export const preParamsLookUp: ParamsLookUp = {
  caParams: [
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
  ],
  cpParams: [
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
  ],
  cvParams: [
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
  ],
  gcplParams: [
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
  ],
  lsvParams: [
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
  ],
  waitParams: [
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
  ],
  zirParams: [
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
  technique: string;
  preParameters: ArraySS;
}

export function techniqueLookUp(id: number): TechniqueLookUp {
  switch (id) {
    case 0x4:
      return { technique: 'GCPL', preParameters: preParamsLookUp.gcplParams };
    case 0x6:
      return { technique: 'CV', preParameters: preParamsLookUp.cvParams };
    case 0xb:
      throw new Error(`Not implemented technique: OCV`);
    case 0x18:
      return { technique: 'CA', preParameters: preParamsLookUp.caParams };
    case 0x19:
      return { technique: 'CP', preParameters: preParamsLookUp.cpParams };
    case 0x1c:
      return { technique: 'WAIT', preParameters: preParamsLookUp.waitParams };
    case 0x1d:
      throw new Error(`Not implemented technique: PEIS`);
    case 0x1e:
      throw new Error(`Not implemented technique: GEIS`);
    case 0x32:
      return { technique: 'ZIR', preParameters: preParamsLookUp.zirParams };
    case 0x6c:
      return { technique: 'LSV', preParameters: preParamsLookUp.lsvParams };
    case 0x7f:
      throw new Error(`Not implemented technique: MB`);
    default:
      throw new Error(
        `Not implemented technique: unknown (0x${id.toString(16)})`,
      );
  }
}

/**
    - LOOP - Loop ? what is it?
export function techniqueParamsFromName(id: string): TechniqueLookUp {
  switch (id) {
    case "Galvanostatic Cycling with Potential Limitation":
      return { technique: 'GCPL', preParameters: gcplParams };
    case "Cyclic Voltammetry":
      return { technique: 'CV', preParameters: cvParams };
    case "Open Circuit Voltage":
      throw new Error(`Not implemented technique: OCV`);
    case "Chronoamperometry / Chronocoulometry":
      return { technique: 'CA', preParameters: caParams };
    case "Chronopotentiometry":
      return { technique: 'CP', preParameters: cpParams };
    case "Wait":
      return { technique: 'WAIT', preParameters: waitParams };
    case "Potentio Electrochemical Impedance Spectroscopy":
      throw new Error("Not implemented technique: PEIS");
    case "Galvano Electrochemical Impedance Spectroscopy":
      throw new Error("Not implemented technique: GEIS");
    case "IR compensation (PEIS)":
      return { technique: 'ZIR', preParameters: zirParams };
    case "Linear Sweep Voltammetry":
      return { technique: 'LSV', preParameters: lsvParams };
    case "Modulo Bat":
      throw new Error("Not implemented technique: MB");
    default:
      throw new Error(
        `Not implemented technique: unknown (0x${id.toString(16)})`,
      );
  }
}
*/
