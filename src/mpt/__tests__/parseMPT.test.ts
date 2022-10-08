import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPT } from '../parseMPT';

describe('parseMPT', () => {
  it('test', () => {
    const arrayBuffer = readFileSync(join(__dirname, './data/test.mpt'));
    const { meta, settings, data } = parseMPT(arrayBuffer);
    console.log(meta, settings,data)

    expect(meta.nbOfHeaderLines).toBe(59);

    //some props in meta
    expect(settings.variables).toMatchObject({
      comments: '',
      user: '',
      flags:  [ "EC-Lab for windows v11.32 (software)", 
           "Internet server v11.32 (firmware)",
           "Command interpretor v11.32 (firmware)" ],
    });

    //some props in vars
    expect(data.variables['Efficiency/%']).toMatchObject({
      label: 'Efficiency',
      units: '%',
      isDependent: true,
    });
  });
});
