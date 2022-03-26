//temporary till groupfiles is released
import { join } from 'path';

import { fileListFromPath } from 'filelist-from';

import { groupFiles } from '../utils';

describe('file grouping at a complex directory', () => {
  it('all data', () => {
    const files = fileListFromPath(join(__dirname, 'data/'));
    const result = groupFiles(files, {
      idWithBasename: true,
      useExtension: true,
    });
    expect(result).toHaveLength(3);
    //expect(result).toMatchSnapshot();
  });

  it('jdb11-4', () => {
    const files = fileListFromPath(join(__dirname, 'data/jdb11-4'));
    const result = groupFiles(files, {
      idWithBasename: false,
      useExtension: false,
      useBasename: true,
      lowerCaseFileKey: true,
    });
    expect(result).toHaveLength(1);
  });

  it('test file', () => {
    const files = fileListFromPath(join(__dirname, 'data/test'));
    const result = groupFiles(files, {
      idWithBasename: false,
      useExtension: false,
      useBasename: false,
      useFilename: true,
    });
    console.log(result);
    expect(Object.keys(result[0])).toHaveLength(4);
  });
});
