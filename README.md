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

## Installation

`$ npm i biologic-converter`

## Usage

```js
import { join } from 'path';
import { fileListFromPath } from 'filelist-from';
import { convertBioLogic as cv } from 'biologic-converter';

const fl = fileListFromPath(join(__dirname, 'data'));

const groups = await cv(fl);
```

## License

## ToDos
At the moment the code parses text files. We are developing the binary parser.

[MIT](./LICENSE)

[ci-image]: https://github.com/cheminfo/biologic-converter/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/cheminfo/biologic-converter/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/biologic-converter.svg
[codecov-url]: https://codecov.io/gh/cheminfo/biologic-converter
[npm-image]: https://img.shields.io/npm/v/biologic-converter.svg
[npm-url]: https://www.npmjs.com/package/biologic-converter
[download-image]: https://img.shields.io/npm/dm/biologic-converter.svg
[download-url]: https://www.npmjs.com/package/biologic-converter
