import { ArraySS, preParamsLookUp as p } from './preParamsLookUp';

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
      return { technique: 'GCPL', preParameters: p.gcplParams };
    case 0x6:
      return { technique: 'CV', preParameters: p.cvParams };
    case 0xb:
      throw new Error(`Not implemented technique: OCV`);
    case 0x18:
      return { technique: 'CA', preParameters: p.caParams };
    case 0x19:
      return { technique: 'CP', preParameters: p.cpParams };
    case 0x1c:
      return { technique: 'WAIT', preParameters: p.waitParams };
    case 0x1d:
      throw new Error(`Not implemented technique: PEIS`);
    case 0x1e:
      throw new Error(`Not implemented technique: GEIS`);
    case 0x32:
      return { technique: 'ZIR', preParameters: p.zirParams };
    case 0x6c:
      return { technique: 'LSV', preParameters: p.lsvParams };
    case 0x7f:
      throw new Error(`Not implemented technique: MB`);
    default:
      throw new Error(
        `Not implemented technique: unknown (0x${id.toString(16)})`,
      );
  }
}
