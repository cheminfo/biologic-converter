import { join } from 'path';

import { fileListFromPath } from 'filelist-utils';

import { convert } from '../convert';

describe('test convert', () => {

  it('directory', async () => {
    const fl = await fileListFromPath(join(__dirname, 'data'));
    const directories = await convert(fl);
    console.log(directories)
    // test number of directories
    expect(directories).toHaveLength(3);
    //each dir is an object with 'dir', 'mpr', 'mps', 'mpt' all optional.
    expect(Object.keys(directories[0])).toStrictEqual(['dir', 'mpr', 'mps']);
    console.log(directories)
    directories.forEach((directory) => delete directory.dir);
    expect(directories).toMatchSnapshot();
  });

  it('passing a not-biologic dir should give []', async () => {
    const fl = await fileListFromPath(join(__dirname, 'data/not-biologic'));
    const directories = await convert(fl);
    expect(directories).toStrictEqual([]);
  });

});
