import { join } from 'path';

import { fileListFromPath } from 'filelist-from';

import { parseMPS } from '../parseMPS';

describe('parseMPS', () => {
  it('test', async () => {
    const fileList = fileListFromPath(join(__dirname, 'data/test')).sort(
      (a, b) => (a.name < b.name ? -1 : 1),
    );
    await parseMPS(fileList[1]);
  });
});
