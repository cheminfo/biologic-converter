import { preParamsLookUp } from './preParamsLookUp';
import { Technique } from './techniqueFromId';
/**
 * maps the text in the MPT/MPS file to the corresponding technique and parameters
 * @param id - id of the technique
 * @returns - technique name and parameters
 */
export function techniqueFromLongName(id: string): Technique {
  switch (id) {
    case 'Galvanostatic Cycling with Potential Limitation':
      return { name: 'GCPL', preParameters: preParamsLookUp.gcplParams };
    case 'Cyclic Voltammetry':
      return { name: 'CV', preParameters: preParamsLookUp.cvParams };
    case 'Open Circuit Voltage':
      return { name: 'OCV', preParameters: preParamsLookUp.ocvParams };
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
    case 'IR compensation (PEIS)':
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
