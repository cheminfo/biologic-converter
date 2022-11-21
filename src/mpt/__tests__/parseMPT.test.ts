import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { MPT, parseMPT } from '../parseMPT';

const dataFiles = join(__dirname, '../../__tests__/data/all/');

describe('parseMPT', () => {
  it('test file', () => {
    const arrayBuffer = readFileSync(join(dataFiles, 'test', 'test.mpt'));
    const result = parseMPT(arrayBuffer) as Required<MPT>;
    const { name, nbOfHeaderLines, settings, log, data } = result;

    expect(name).toBe('EC-Lab ASCII FILE');
    expect(nbOfHeaderLines).toBe(59);

    //some props in meta
    expect(settings.variables).toMatchObject({
      comments: '',
      user: '',
      technique: 'CA',
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
    expect(data.variables.c).toMatchObject({
      label: 'error',
      units: '',
      isDependent: true,
    });
  });

  it('cyclic voltammetry', () => {
    const arrayBuffer = readFileSync(join(dataFiles, 'cv/cv.mpt'));
    const result = parseMPT(arrayBuffer);
    const { name, nbOfHeaderLines, settings, log, data } = result;
    expect(name).toBe('EC-Lab ASCII FILE');
    expect(nbOfHeaderLines).toBe(55);
    //some props in meta
    expect(settings?.variables).toMatchObject({
      comments: '',
      user: '',
      technique: 'CV',
      electrodeConnection: 'standard',
      initialState: '',
      electrodeMaterial: '',
      electrolyte: '',
      electrodeSurfaceArea: { unit: 'cm²', value: 0.001 },
      equivalentWeight: { value: 0.0, unit: 'g/eq.' },
      cycleDefinition: 'Charge/Discharge alternance',
      density: { unit: 'g/cm3', value: 0 },
    });

    expect(log?.variables).toMatchObject({
      averagingPoints: 50,
      runOnChannel: { number: 11, serial: 9636 },
      address: '192.109.209.128',
      eweCtrlRange: { min: 0, minUnit: 'V', max: 10, maxUnit: 'V' },
      serverVersion: 'v11.12',
      ecLabVersion: 'v11.12',
      interpreterVersion: 'v11.12',
    });
    expect(Object.keys(data.variables || {})).toHaveLength(12);
    expect(data?.variables.f).toMatchObject({
      label: 'time',
      units: 's',
      isDependent: false,
    });
    expect(Object.keys(data.variables.f.data || {})).toHaveLength(5103);
  });

  it('empty file throws', () => {
    const arrayBuffer = readFileSync(join(dataFiles, 'noData.mpt'));
    expect(() => parseMPT(arrayBuffer)).toThrow(
      'No data was found by the parser',
    );
  });

  it('no header / only data file', () => {
    const arrayBuffer = readFileSync(join(dataFiles, 'noHeader.mpt'));
    const result = parseMPT(arrayBuffer) as Required<MPT>;
    const { data } = result;
    expect(data).toBeDefined();
  });
});
