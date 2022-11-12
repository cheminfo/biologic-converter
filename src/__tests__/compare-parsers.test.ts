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

    const e1 = mptSettings?.electrodeSurfaceArea as { value: number };
    const c1 = mptSettings?.characteristicMass as { value: number };
    const r1 = mptSettings?.referenceElectrode as string;

    expect(r1).toMatch(mprSettings?.referenceElectrode);
    expect(e1.value).toBeCloseTo(mprSettings?.electrodeSurfaceArea);
    expect(c1.value).toBeCloseTo(mprSettings?.characteristicMass);
    expect(mpr).toMatchSnapshot();
  });
});
