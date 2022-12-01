import { Param, preParamsLookUp } from './preParamsLookUp';

export interface Technique {
  name: string; //technique name
  preParameters: Param[]; //an object helper to parse the parameters
}

/**
 * Map Technique ID to its name and available parameters.
 * @param id - technique ID
 * @returns - name and preParameters
 */
export function techniqueFromId(id: number): Technique {
  switch (id) {
    case 0x4:
      return { name: 'GCPL', preParameters: preParamsLookUp.gcplParams };
    case 0x6:
      return { name: 'CV', preParameters: preParamsLookUp.cvParams };
    case 0xb:
      return { name: 'OCV', preParameters: preParamsLookUp.ocvParams };
    case 0x18:
      return { name: 'CA', preParameters: preParamsLookUp.caParams };
    case 0x19:
      return { name: 'CP', preParameters: preParamsLookUp.cpParams };
    case 0x1c:
      return { name: 'WAIT', preParameters: preParamsLookUp.waitParams };
    case 0x1d:
      return { name: 'PEIS', preParameters: preParamsLookUp.peisParams };
    case 0x1e:
      return { name: 'GEIS', preParameters: preParamsLookUp.geisParams };
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
