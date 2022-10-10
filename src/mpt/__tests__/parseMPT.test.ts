import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPT } from '../parseMPT';

describe('parseMPT', () => {
  it('test file', () => {
    const arrayBuffer = readFileSync(join(__dirname, './data/test.mpt'));
    const result = parseMPT(arrayBuffer);
    const { meta, settings, log, data } = result;

    expect(meta).toStrictEqual({
      name: 'EC-Lab ASCII FILE',
      nbOfHeaderLines: 59,
    });
    //some props in meta
    expect(settings.variables).toMatchObject({
      comments: '',
      user: '',
      technique: 'Chronoamperometry / Chronocoulometry',
      electrodeConnection: 'standard',
      channel: 'Floating',
      density: { unit: 'g/cm3', value: 0 },
    });

    expect(log?.variables).toMatchObject({
      runOnChannel: { number: 1, serial: 3441 },
      address: 'USB',
      eweCtrlRange: { min: -10, minUnit: 'V', max: 10, maxUnit: 'V' },
      serverVersion: 'v11.32',
      ecLabVersion: 'v11.32',
      interpreterVersion: 'v11.32',
    });

    //some props in vars
    expect(data.variables['Efficiency/%']).toMatchObject({
      label: 'Efficiency',
      units: '%',
      isDependent: true,
    });
  });
});
