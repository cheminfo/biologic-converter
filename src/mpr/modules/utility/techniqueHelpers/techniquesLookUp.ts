import { ArraySS, techniquesAndParams as tp } from "techniquesList";

interface TechniqueLookUp { technique:string, parameters:ArraySS }

export function techniqueLookUp(id: number): TechniqueLookUp {
  switch (id) {
    case 0x4:
      return { technique: 'GCPL', parameters:  tp.gcplParams};
    case 0x6:
      return { technique: 'CV', parameters:  tp.cvParams};
    case 0xb:
      throw new Error(`Not implemented technique: OCV`);
    case 0x18:
      return { technique: 'CA', parameters:  tp.caParams};
    case 0x19:
      return { technique: 'CP', parameters:  cpParams};
    case 0x1c:
      return { technique: 'WAIT', parameters:  tp.waitParams};
    case 0x1d:
      throw new Error(`Not implemented technique: PEIS`);
    case 0x1e:
      throw new Error(`Not implemented technique: GEIS`);
    case 0x32:
      return { technique: 'ZIR', parameters:  tp.zirParams};
    case 0x6c:
      return { technique: 'LSV', parameters:  tp.lsvParams};
    case 0x7f:
      throw new Error(`Not implemented technique: MB`);
    default:
      throw new Error(
        `Not implemented technique: unknown (0x${id.toString(16)})`
      );
  }
}
