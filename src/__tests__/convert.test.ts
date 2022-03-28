import { join } from 'path';

import { fileListFromPath } from 'filelist-from';

import { convertBioLogic as convert } from '../convert';

describe('convert', () => {
  it('test', async () => {
    const fl = fileListFromPath(join(__dirname, 'data'));
    const groups = await convert(fl, {
    idWithBasename:true, 
    useExtension:true
});
    //test number of directories
    expect(groups).toHaveLength(3);
    //test if the keys make sense
    expect(Object.keys(groups[0])).toEqual(["mps", "mpr"])
    expect(groups).toMatchSnapshot();
  });
});
