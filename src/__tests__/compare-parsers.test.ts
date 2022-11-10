import { readFileSync as rfs } from 'node:fs';
import { join } from 'node:path';

import { convert } from '../convert';

const testFiles = join(__dirname, 'data');
describe('compare parsers', () => {
  it('compare parsers cp.[mpt,mpr]', async () => {
    const mptFile = rfs(join(testFiles, 'all', 'cp', 'cp.mpt'));
    const mprFile = rfs(join(testFiles, 'all', 'cp', 'cp.mpr'));

    const mpt = (await convert(mptFile, 'mpt'))?.mpt;
    const mpr = (await convert(mprFile, 'mpt'))?.mpr;

    expect(mpr?.name).toBe('BIO-LOGIC MODULAR FILE');
    expect(mpt?.name).toBe('EC-Lab ASCII FILE');

    const mprSettings = mpr?.settings.variables;
    const mptSettings = mpt?.settings?.variables;
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

    expect(r1).toMatch(mprSettings?.referenceElectrode as string);
    expect(e1.value).toBeCloseTo(mprSettings?.electrodeSurfaceArea as number);
    expect(c1.value).toBeCloseTo(mprSettings?.characteristicMass as number);
    expect(mpr).toMatchSnapshot();
  });
});
