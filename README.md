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
import { readFileSync as rfs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// import the parser you need
import { parseMPR, /*parseMPT, parseMPS*/ } from 'biologic-converter';

// build the path
const __dirname = dirname(fileURLToPath(import.meta.url))
// get buffer
const mpr = rfs(join(__dirname, 'testDirectory/ca/ca.mpr'));
const result = parseMPR(mpr); //JSON-like object
console.log(result)
```

<details>

<summary>
**Sample output**
</summary<

```text
{
  name: 'BIO-LOGIC MODULAR FILE',
  settings: {
    header: {
      shortName: 'VMP Set',
      longName: 'VMP settings',
      length: 6691,
      version: 0,
      date: '04/29/19'
    },
    variables: {
      technique: 'CA',
      comments: '',
      activeMaterialMass: 0.875,
      atX: 0,
      molecularWeight: 0.0010000000474974513,
      atomicWeight: 0.0010000000474974513,
      //...
      params: [Object]
    }
  },
  data: {
    header: {
      shortName: 'VMP data',
      longName: 'VMP data',
      length: 55923,
      version: 3,
      date: '04/29/19'
    },
    variables: {
      z: [Object],
      y: [Object],
      x: [Object],
      w: [Object],
      //...
    }
  },
  log: {
    header: {
      shortName: 'VMP LOG',
      longName: 'VMP LOG',
      length: 7742,
      version: 0,
      date: '05/01/19'
    },
    variables: {
      runOnChannel: [Object],
      eweControlRange: [Object],
      oleTimestamp: 43584.65494212963,
      //...
    }
  }
}
```
</details>

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
