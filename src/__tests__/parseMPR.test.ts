import { join } from 'path';

import { fileListFromPath } from 'filelist-from';

import { parseMPR } from '../parseMPR';

describe('parseMPR', () => {
  it('test', async () => {
    const fileList = fileListFromPath(join(__dirname, 'data/test')).sort(
      (a, b) => (a.name < b.name ? -1 : 1),
    );
    await parseMPR(fileList[0]);
  });
});
