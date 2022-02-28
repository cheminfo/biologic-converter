import { join } from 'path';

import { fileListFromPath } from 'filelist-from';

import { parseMPT } from '../parseMPT';

describe('parseMPT', () => {
  it('test', async () => {
    const fileList = fileListFromPath(join(__dirname, 'data/test')).sort(
      (a, b) => (a.name < b.name ? -1 : 1),
    );
    await parseMPT(fileList[2]);
  });
});
