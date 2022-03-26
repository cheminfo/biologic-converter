import { join } from 'path';

import { fileListFromPath } from 'filelist-from';

import { convertBioLogic as convert } from '../convert';

describe('convert', () => {
  it('test', async () => {
    const dirs = fileListFromPath(join(__dirname, 'data'));
    const measurements = await convert(dirs);
    expect(measurements).toHaveLength(3);
    expect(measurements).toMatchSnapshot();
  });
});
