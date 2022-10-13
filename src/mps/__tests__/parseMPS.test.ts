import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPS } from '../parseMPS';

describe('parseMPS', () => {
  it('basic test: parse string', () => {
    //test a simple string
    const textData =
      'THISFILEYAY\n\nkey : val\nw space : val\nmultiline :\n  this.';
    const result = parseMPS(textData);
    expect(result).toMatchObject({
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
      electrodeSurfaceArea: { value: 0.001, unit: 'cm²' },
      characteristicMass: { value: 0.001, unit: 'g' },
      equivalentWeight: { value: 0.0, unit: 'g/eq.' },
      density: { value: 0.0, unit: 'g/cm3' },
      cycleDefinition: 'Charge/Discharge alternance',
      numberOfLinkedTechniques: 2,
    });
  });
});
