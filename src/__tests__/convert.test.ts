import { join } from 'path';

import { fileCollectionFromPath } from 'filelist-utils';

import { convert } from '../convert';

describe('test convert', () => {
  it('parses directory', async () => {
    const fc = await fileCollectionFromPath(
      join(__dirname, 'data/testDirectory'),
    );
    const directories = await convert(fc);
    expect(directories).toHaveLength(2);
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
    ]);
    expect(directories).toMatchSnapshot();
  });

  it('passing a not-biologic dir should give []', async () => {
    const fl = await fileCollectionFromPath(
      join(__dirname, 'data/not-biologic'),
    );
    const directories = await convert(fl);
    expect(directories).toStrictEqual([]);
  });
});
