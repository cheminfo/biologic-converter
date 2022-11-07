import { join } from 'path';

import { fileCollectionFromPath } from 'filelist-utils';

import { convert } from '../convert';

describe('test convert', () => {
  it('compare parsers cp.{mpt,mpr}', async () => {
    const fc = await fileCollectionFromPath(
      join(__dirname, 'data/compareParsers'),
    );
    const mprFile = fc.files.filter((f) => f.name.endsWith('.mpr'))[0];
    const mptFile = fc.files.filter((f) => f.name.endsWith('.mpt'))[0];
    const mpr = (await convert(mprFile))?.mpr;
    const mpt = (await convert(mptFile))?.mpt;

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
