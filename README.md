# biologic-converter

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Convert BioLogic file format.

There are 3 possible extensions:

- .mpr : _Raw_ binary file containing the data
- .mpt : .mpr into _Text_ file
- .mps : experiment _Settings_ text file.

Other files: sometimes the data may be in a `.txt` file. This is very rare but if this is the case,
report it and we will add support for these. Other files created by the software are ignored by the
parser.

## Installation

`npm i biologic-converter`

## Usage

```js
import { join } from 'path';
import { fileCollectionFromPath } from 'filelist-utils';

import { convert as cv } from 'biologic-converter';

async function run() {
  /* path to the root dir of experiments or any child */
  const fc = fileCollectionFromPath(join(__dirname, 'data'));
  const experiments = [];
  for (const experiment of fc.files) {
    const rawData = await experiment.arrayBuffer();
    const result = await cv(rawData); //result or undefined
    if (result) experiments.push(result);
  }
  return experiments;
}

run()
  .then((r) => console.log(r))
  .catch((e) => console.error(e));
```

## License

[MIT](./LICENSE)

Test files from https://github.com/dgbowl/yadg

[ci-image]: https://github.com/cheminfo/biologic-converter/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/cheminfo/biologic-converter/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/biologic-converter.svg
[codecov-url]: https://codecov.io/gh/cheminfo/biologic-converter
[npm-image]: https://img.shields.io/npm/v/biologic-converter.svg
[npm-url]: https://www.npmjs.com/package/biologic-converter
[download-image]: https://img.shields.io/npm/dm/biologic-converter.svg
[download-url]: https://www.npmjs.com/package/biologic-converter
