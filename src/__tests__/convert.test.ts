import { join } from 'node:path';

import { fileCollectionFromPath } from 'filelist-utils';

import { convert } from '../convert';

const testFiles = join(__dirname, 'data');

describe('test convert', () => {
  it('parse ca directory', async () => {
    const fc = await fileCollectionFromPath(join(testFiles, 'all', 'ca'));
    const directory = await convert(fc);
    expect(directory.data).toMatchObject([
      {
        dir: 'ca',
        mpr: {
          name: 'BIO-LOGIC MODULAR FILE',
        },
        mpt: { name: 'EC-Lab ASCII FILE' },
      },
    ]);
    expect(directory.logs).toHaveLength(1);
  });

  it('passing a not-biologic dir should give []', async () => {
    const fc = await fileCollectionFromPath(join(testFiles, 'not-biologic'));
    const directories = await convert(fc);
    expect(directories.data).toStrictEqual([]);
    expect(directories.logs[0]).toMatchObject({
      parser: 'biologic-converter',
      kind: 'summary',
    });
  });

  it('Not implemented experiment logs', async () => {
    const fc = await fileCollectionFromPath(join(testFiles, 'all', 'geis'));
    const directories = await convert(fc);
    expect(directories.data).toStrictEqual([]);
    expect(directories.logs).toHaveLength(2);
    const error = directories.logs.find((log) => log.kind === 'error');
    const summary = directories.logs.find((log) => log.kind === 'summary');
    expect(error).toMatchObject({
      parser: 'biologic-converter',
      kind: 'error',
      relativePath: 'geis/geis.mpt',
    });
    expect(summary).toMatchObject({
      parser: 'biologic-converter',
      kind: 'summary',
    });
  });

  it('compare parsers cp.[mpt,mpr]', async () => {
    const fc = await fileCollectionFromPath(join(testFiles, 'all', 'cp'));
    const directory = await convert(fc);
    expect(directory.data).toHaveLength(1);
    const { mpr, mpt } = directory.data[0];
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
