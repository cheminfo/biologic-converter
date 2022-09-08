import { join } from 'path';

import { fileListFromPath } from 'filelist-utils';

import { convert } from '../convert';

describe('convert', () => {
  it('test mps', async () => {
    const fl = await fileListFromPath(join(__dirname, 'data'));
    const directories = await convert(fl);
    // test number of directories
    expect(directories).toHaveLength(3);
    //each dir is an object with 'dir', 'mpr', 'mps', 'mpt' all optional.
    expect(Object.keys(directories[0])).toStrictEqual(['dir', 'mps']);
    directories.forEach((directory) => delete directory.dir);
    expect(directories).toMatchSnapshot();
  });
});
