import { readFileSync } from 'fs';
import { join } from 'path';

import { parseTechnique, parseMPS } from '../parseMPS';

describe('parseMPS', () => {
  it('parse an mps file', () => {
    const arrayBuffer = readFileSync(
      join(__dirname, '../../__tests__/data/test/test.mps'),
    );

    const result = parseMPS(arrayBuffer);
    expect(Object.keys(result)).toHaveLength(20);
    expect(result).toMatchObject({'Electrode material': '',
      'Initial state': '',
      Electrolyte: '',
      Comments: '',
      Cable: 'standard',
      'Electrode surface area': '0.001 cm²',
      'Characteristic mass': '0.001 g',
      'Equivalent Weight': '0.000 g/eq.',
      Density: '0.000 g/cm3',
      'Cycle Definition': 'Charge/Discharge alternance',
})
    // needs more tests here
})

it('parse a complex string', ()=> {
    //test a simple string
    const textData = 'THISFILEYAY\n\nkey : val\nw space : val\nmultiline :\n  this.';
    const result2 = parseMPS(textData);
    expect(result2).toMatchObject({
      fileType:"THISFILEYAY",
      key: 'val',
      'w space': 'val',
      multiline: `\nthis.`,
    });
  });

  it('parse a technique-like array', () => {
    const myLines = ['Amperometry', 'hello   world', 'key   value', ''];
    const [result] = parseTechnique(myLines, 0);
    expect(result).toMatchObject({
      name: 'Amperometry',
      hello: 'world',
      key: 'value',
    });
  });
});
