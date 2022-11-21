import { readFileSync as rfs } from 'node:fs';
import { join } from 'node:path';

import { parseMPR } from '../mpr/parseMPR';
import { parseMPT } from '../mpt/parseMPT';

const testFiles = join(__dirname, 'data');
describe('compare parsers', () => {
  it('compare parsers cp.[mpt,mpr]', async () => {
    const mptFile = rfs(join(testFiles, 'all', 'cp', 'cp.mpt'));
    const mprFile = rfs(join(testFiles, 'all', 'cp', 'cp.mpr'));

    const mpt = parseMPT(mptFile);
    const mpr = parseMPR(mprFile);

    expect(mpr?.name).toBe('BIO-LOGIC MODULAR FILE');
    expect(mpt?.name).toBe('EC-Lab ASCII FILE');

    const mprSettings = mpr.settings.variables;
    const mptSettings = mpt.settings?.variables;
    const comparisonObject = {
      technique: 'CP',
      comments: '',
      electrodeMaterial: '',
      electrolyte: '',
    };
    expect(mprSettings).toMatchObject(comparisonObject);
    expect(mptSettings).toMatchObject(comparisonObject);

    const e1 = mptSettings?.electrodeSurfaceArea;
    const c1 = mptSettings?.characteristicMass;
    const r1 = mptSettings?.referenceElectrode;

    expect(r1).toMatch(mprSettings?.referenceElectrode);
    expect(e1.value).toBeCloseTo(mprSettings?.electrodeSurfaceArea);
    expect(c1.value).toBeCloseTo(mprSettings?.characteristicMass);
    expect(mpr).toMatchSnapshot();
  });
  it('compare parsers ocv.[mpt,mpr]', async () => {
    const mptFile = rfs(join(testFiles, 'all', 'ocv', 'ocv.mpt'));
    const mprFile = rfs(join(testFiles, 'all', 'ocv', 'ocv.mpr'));

    const mpt = parseMPT(mptFile);
    const mpr = parseMPR(mprFile);

    expect(mpr?.name).toBe('BIO-LOGIC MODULAR FILE');
    expect(mpt?.name).toBe('EC-Lab ASCII FILE');

    const mprSettings = mpr.settings.variables;
    const mptSettings = mpt.settings?.variables;
    const comparisonObject: {
      technique: string;
      comments: string | string[];
      electrodeMaterial: string;
      electrolyte: string;
    } = {
      technique: 'OCV',
      comments: [
        '25°C',
        'Al bot, SS top,',
        '1 C',
        '1.25 times oversized cathode',
      ],
      electrodeMaterial: 'LMO(Ti) vs C-TiO2 (Al)',
      electrolyte: '40/20 LiTFSI/EmiTFSI',
    };
    expect(mptSettings).toMatchObject(comparisonObject);

    /* no idea why the mprSettings.comments !== mptSettings.comments */
    comparisonObject.comments = '';
    expect(mprSettings).toMatchObject(comparisonObject);

    const e1 = mptSettings?.electrodeSurfaceArea;
    const c1 = mptSettings?.characteristicMass;

    expect(e1.value).toBeCloseTo(mprSettings?.electrodeSurfaceArea);
    expect(c1.value).toBeCloseTo(mprSettings?.characteristicMass);
    const mprTime = mpr.data.variables.c;
    const mptTime = mpt.data.variables.c;
    expect(mprTime.data).toHaveLength(mptTime.data.length);
    expect(mprTime.data[123]).toBeCloseTo(mptTime.data[123]);
    expect(mprTime.data[128]).toBeCloseTo(mptTime.data[128]);
  });

  it('compare parsers ca.[mpt,mpr]', async () => {
    const mptFile = rfs(join(testFiles, 'all', 'ca', 'ca.mpt'));
    const mprFile = rfs(join(testFiles, 'all', 'ca', 'ca.mpr'));
    const mpt = parseMPT(mptFile)?.settings?.variables.params;
    const mpr = parseMPR(mprFile).settings.variables.params;
    expect(mpr.Imax).toBe('pass');
    expect(mpt?.Imax.value).toBe('pass');
  });
});
