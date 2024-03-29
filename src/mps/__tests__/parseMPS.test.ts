import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { parseMPS } from '../parseMPS';

const data = join(__dirname, '/../../__tests__/data/all/');
describe('parseMPS', () => {
  it('basic test: parse string', () => {
    //test a simple string
    const textData =
      'THISFILEYAY\n\nkey : val\nw space : val\nmultiline :\n  this.';
    const result = parseMPS(textData);
    expect(result).toMatchObject({
      name: 'THISFILEYAY',
      settings: {
        variables: {
          key: 'val',
          wSpace: 'val',
          multiline: `\nthis.`,
        },
      },
    });
  });

  it('parse an mps file', () => {
    const arrayBuffer = readFileSync(join(data, 'test', 'test.mps'));

    const result = parseMPS(arrayBuffer);
    expect(Object.keys(result)).toHaveLength(3);
    expect(Object.keys(result.settings.variables.techniques)).toHaveLength(2);
    expect(result).toMatchObject({
      settings: {
        variables: {
          electrodeMaterial: '',
          initialState: '',
          electrolyte: '',
          comments: '',
          cable: 'standard',
          electrodeSurfaceArea: { value: 0.001, unit: 'cm²' },
          characteristicMass: { value: 0.001, unit: 'g' },
          equivalentWeight: { value: 0, unit: 'g/eq.' },
          density: { value: 0, unit: 'g/cm3' },
          cycleDefinition: 'Charge/Discharge alternance',
          numberOfLinkedTechniques: 2,
        },
      },
      log: {
        variables: {
          filename:
            'Z:\\Data group member\\Anna\\EC\\2021-10-20_AL0006_SolGel4_EC1_-0.5V_ref1021_1\\CA_AL0006_.mps',
          device: 'SP-200',
        },
      },
    });
  });
});
