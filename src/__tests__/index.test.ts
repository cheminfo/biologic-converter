import { join } from 'path';

import { fileListFromPath } from 'filelist-from';

import { convert } from '..';

describe('convert', () => {
  it('test', async () => {
    const fileList = fileListFromPath(join(__dirname, 'data/test'));

    const result = await convert(fileList);
    expect(result).toBe(42);
  });
});
