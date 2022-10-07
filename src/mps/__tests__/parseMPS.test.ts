import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPS } from '../parseMPS';

describe('parseMPS', () => {
  it('basic test: parse string', () => {
    //test a simple string
    const textData =
      'THISFILEYAY\n\nkey : val\nw space : val\nmultiline :\n  this.';
    const result2 = parseMPS(textData);
    expect(result2).toMatchObject({
      name: 'THISFILEYAY',
      key: 'val',
      wSpace: 'val',
      multiline: `\nthis.`,
    });
  });

  it('parse an mps file', () => {
    const arrayBuffer = readFileSync(join(__dirname, './data/test.mps'));

    const result = parseMPS(arrayBuffer);
    expect(Object.keys(result)).toHaveLength(20);
    expect(result).toMatchObject({
      electrodeMaterial: '',
      initialState: '',
      electrolyte: '',
      comments: '',
      cable: 'standard',
      electrodeSurfaceArea: '0.001 cm²',
      characteristicMass: '0.001 g',
      equivalentWeight: '0.000 g/eq.',
      density: '0.000 g/cm3',
      cycleDefinition: 'Charge/Discharge alternance',
    });
  });
});
