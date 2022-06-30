import { join } from 'path';

import { fileListFromPath } from 'filelist-utils';

import { convertBioLogic as convert } from '../convert';

describe('convert', () => {
  it('test', async () => {
    const fl = fileListFromPath(join(__dirname, 'data'));
    const directories = await convert(fl);
    // test number of directories
    expect(directories).toHaveLength(3);
    //each dir is an object with 'dir', 'mpr', 'mps', 'mpt' all optional.
    expect(Object.keys(directories[0])).toStrictEqual([
      'dir',
      /*'mpr',*/ 'mps',
    ]);
    expect(directories).toMatchSnapshot();
  });
});
