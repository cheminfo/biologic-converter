import { join } from 'node:path';

import { fileCollectionFromPath } from 'filelist-utils';

import { convert } from '../convert';

const testFiles = join(__dirname, 'data');

describe('test convert', () => {
  it('parse ca directory', async () => {
    const fc = await fileCollectionFromPath(join(testFiles, 'all', 'ca'));
    const directory = await convert(fc);
    expect(directory).toHaveLength(1);
    expect(directory).toMatchObject([
      {
        dir: 'ca',
        mpr: {
          name: 'BIO-LOGIC MODULAR FILE',
        },
        mpt: { name: 'EC-Lab ASCII FILE' },
      },
    ]);
  });

  it('passing a not-biologic dir should give []', async () => {
    const fc = await fileCollectionFromPath(join(testFiles, 'not-biologic'));
    const directories = await convert(fc);
    expect(directories).toStrictEqual([]);
  });

  it('compare parsers cp.[mpt,mpr]', async () => {
    const fc = await fileCollectionFromPath(join(testFiles, 'all', 'cp'));
    const directory = await convert(fc);
    expect(directory).toHaveLength(1);
    const { mpr, mpt } = directory[0];
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
