import { join } from 'path';

import { fileCollectionFromPath } from 'filelist-utils';

import { convert } from '../convert';

describe('test convert', () => {
  it('parses directory', async () => {
    const fc = await fileCollectionFromPath(
      join(__dirname, 'data/testDirectory'),
    );
    const directories = await convert(fc);
    expect(directories).toHaveLength(3);
    expect(directories).toMatchObject([
      {
        dir: 'testDirectory/ca',
        mpr: {
          name: 'BIO-LOGIC MODULAR FILE',
        },
        mpt: { name: 'EC-Lab ASCII FILE' },
      },
      {
        dir: 'testDirectory/jdb11-1',
        mpr: {
          name: 'BIO-LOGIC MODULAR FILE',
        },
        mps: { name: 'EC-LAB SETTING FILE' },
      },
      {
        dir: 'testDirectory/jdb11-4',
        mpr: {
          name: 'BIO-LOGIC MODULAR FILE',
        },
      },
    ]);
  });

  it('passing a not-biologic dir should give []', async () => {
    const fl = await fileCollectionFromPath(
      join(__dirname, 'data/not-biologic'),
    );
    const directories = await convert(fl);
    expect(directories).toStrictEqual([]);
  });

  it('compare parsers cp.[mpt,mpr]', async () => {
    const fc = await fileCollectionFromPath(
      join(__dirname, 'data/compareParsers'),
    );
    const directory = await convert(fc);
    expect(directory).toHaveLength(1);
    const { mpr, mpt } = directory[0];
    expect(mpr?.name).toBe('BIO-LOGIC MODULAR FILE');
    expect(mpt?.name).toBe('EC-Lab ASCII FILE');

    const mprSettings = mpr?.settings.variables;
    const mptSettings = mpt?.settings.variables;
    const comparisonObject = {
      technique: 'CP',
      comments: '',
      electrodeMaterial: '',
      electrolyte: '',
    };
    expect(mprSettings).toMatchObject(comparisonObject);
    expect(mptSettings).toMatchObject(comparisonObject);

    const {
      electrodeSurfaceArea: e1,
      characteristicMass: c1,
      referenceElectrode: r1,
    } = mptSettings;

    expect(r1).toMatch(mprSettings?.referenceElectrode as string);
    expect(e1.value).toBeCloseTo(mprSettings?.electrodeSurfaceArea as number);
    expect(c1.value).toBeCloseTo(mprSettings?.characteristicMass as number);
    expect(mpr).toMatchSnapshot();
  });
});
