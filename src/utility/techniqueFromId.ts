import { Param, preParamsLookUp } from './preParamsLookUp';

export interface Technique {
  name: string; //technique name
  preParameters: Param[]; //an object helper to parse the parameters
}

/**
 * maps the technique id to the technique name and parameters.
 * @param id  - technique id
 * @returns - technique name and parameters
 */
export function techniqueFromId(id: number): Technique {
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
