import { readFileSync as rfs } from 'node:fs';
import { join } from 'node:path';

import { parseMPR, parseMPT } from '../index';

const testFiles = join(__dirname, 'data/all/cp');
describe('parse CP file', () => {
  it('compare parsers cp.[mpt,mpr]', async () => {
    const mptFile = rfs(join(testFiles, 'cp.mpt'));
    const mprFile = rfs(join(testFiles, 'cp.mpr'));

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

    const variables = mpr.data.variables;
    const mptVariables = mpt.data.variables;
    expect(Object.keys(variables).length).toBeLessThanOrEqual(
      Object.keys(mptVariables).length,
    );
    expect(variables.a.data[0]).toBeCloseTo(mptVariables.a.data[0]);
  });
});
