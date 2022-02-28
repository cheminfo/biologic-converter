import { join } from 'path';

import { fileListFromPath } from 'filelist-from';

import { convert } from '..';

describe('convert', () => {
  it('test', async () => {
    const fileList = fileListFromPath(join(__dirname, 'data/test'));

    const measurements = await convert(fileList);
    expect(measurements).toHaveLength(1);
  });
});
