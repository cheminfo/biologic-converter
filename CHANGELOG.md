# Changelog

## [0.6.0](https://github.com/cheminfo/biologic-converter/compare/v0.5.0...v0.6.0) (2022-11-21)


### ⚠ BREAKING CHANGES

* release refactored code

### Features

* release refactored code ([2679eb0](https://github.com/cheminfo/biologic-converter/commit/2679eb033431eaf6fb971ed438bc74f81a450080))

## [0.5.0](https://github.com/cheminfo/biologic-converter/compare/v0.4.0...v0.5.0) (2022-11-11)


### ⚠ BREAKING CHANGES

* parse single files (#26)

### Code Refactoring

* parse single files ([#26](https://github.com/cheminfo/biologic-converter/issues/26)) ([8189d63](https://github.com/cheminfo/biologic-converter/commit/8189d63ed4a1ed6886a0ce4e20ec5ebdda4c22e7))

## [0.4.0](https://github.com/cheminfo/biologic-converter/compare/v0.3.3...v0.4.0) (2022-10-24)


### Features

* **both parsers:** resolve variables to single letter  ([#20](https://github.com/cheminfo/biologic-converter/issues/20)) ([7ffbb3c](https://github.com/cheminfo/biologic-converter/commit/7ffbb3c0abd02f64023909887333b0ed0603b4d4))

## [0.3.3](https://github.com/cheminfo/biologic-converter/compare/v0.3.2...v0.3.3) (2022-10-20)


### Bug Fixes

* update dependencies ([2e88910](https://github.com/cheminfo/biologic-converter/commit/2e889104d12445a0ed7f9bfadc9a44354405ab0f))

## [0.3.2](https://github.com/cheminfo/biologic-converter/compare/v0.3.1...v0.3.2) (2022-10-16)


### Bug Fixes

* added missing type ([61d064c](https://github.com/cheminfo/biologic-converter/commit/61d064c44eb2a6be2db1f110b163fdd5a08a2560))

## [0.3.1](https://github.com/cheminfo/biologic-converter/compare/v0.3.0...v0.3.1) (2022-10-16)


### Bug Fixes

* compatible to MeasurementVariable ([c36f722](https://github.com/cheminfo/biologic-converter/commit/c36f722426150cefd7f944a26a6f43bf564ad49c))

## [0.3.0](https://github.com/cheminfo/biologic-converter/compare/v0.2.0...v0.3.0) (2022-10-16)


### Features

* more compatibility between mpt and mpr and more tests ([0f2a13e](https://github.com/cheminfo/biologic-converter/commit/0f2a13e6b6cf791769d9d44ad50771ccc1f996e5))


### Bug Fixes

* **IRange:** if the value isnt found, it will temporarily convert it to string, until we know what is the real mapping (not available anywhere). ([7e4607c](https://github.com/cheminfo/biologic-converter/commit/7e4607c7285016f1af0d22f66faa2b21cf4b0804))
* mpr and mpt similarity, first steps ([a17a06b](https://github.com/cheminfo/biologic-converter/commit/a17a06b8e1251789823412a17e89df06f6d9afd5))
* return MeasurementVariable explicitly ([d2a7a56](https://github.com/cheminfo/biologic-converter/commit/d2a7a568e653ef9cf962d558b45734c306aec9f4))

## [0.2.0](https://github.com/cheminfo/biologic-converter/compare/v0.1.0...v0.2.0) (2022-10-13)


### Features

* adds params parsing taken from MPR. ([2b7be5f](https://github.com/cheminfo/biologic-converter/commit/2b7be5f9f0e44fc010df66a25a8b785ea596b2ec))
* adds params parsing taken from MPR. ([05e09ef](https://github.com/cheminfo/biologic-converter/commit/05e09ef1fa06d3c0283a8a02bff81dbc7fb4c50a))
* mpr, mps, mpt settings and params seem aligned. TODO: more tests,  ssync data ([490902e](https://github.com/cheminfo/biologic-converter/commit/490902eed7c35a3101ec5157a866732274f7a4d5))
* mpr, mps, mpt settings and params seem aligned. TODO: more tests,  ssync data ([1500966](https://github.com/cheminfo/biologic-converter/commit/1500966343e5a73b6fcfbeb9222e703f3f6f70eb))
* MPS now closer to MPR[settings] ([5c9b948](https://github.com/cheminfo/biologic-converter/commit/5c9b948591f6a7a6b4ee52c4231c18fba22d7af0))
* MPS now closer to MPR[settings] ([f799783](https://github.com/cheminfo/biologic-converter/commit/f799783d8a4270b044125a32e8dfd4371042745c))


### Bug Fixes

* a possible method to make the data more useful ([46b2929](https://github.com/cheminfo/biologic-converter/commit/46b2929fed80370e5eb33ae0a53b540d1f6bb0be))
* a possible method to make the data more useful ([fcbc858](https://github.com/cheminfo/biologic-converter/commit/fcbc85896d76e6e8bd68cd375a5c26056629fe39))
* added fileCollection support and fix missing ids ([ef1cf16](https://github.com/cheminfo/biologic-converter/commit/ef1cf1642f4cc8580bd8857fd80dd4531adaa90c))
* added fileCollection support and fix missing ids ([bc82327](https://github.com/cheminfo/biologic-converter/commit/bc82327a6dd648ccdf0b1bfa784a281696636bc5))
* map from number to string for current and isunit ([3047c42](https://github.com/cheminfo/biologic-converter/commit/3047c42c33107fa468bc8b5dc9fa9b03acb91320))
* map from number to string for current and isunit ([b5acf74](https://github.com/cheminfo/biologic-converter/commit/b5acf746ab8b09fb51e81b5e7af487ebb6c05948))
* normalize ([141d9ee](https://github.com/cheminfo/biologic-converter/commit/141d9eea4a09d77203c445e2ffc405bc5971d25c))
* parses MPS, still params are all strings ([0323691](https://github.com/cheminfo/biologic-converter/commit/0323691f9a3571dc3c0eb6a7beae4e630041b201))
* parses MPS, still params are all strings ([0228be4](https://github.com/cheminfo/biologic-converter/commit/0228be494deb1078d4d86a8dd12bd5c1c069064b))
* several errors in the new feature ([79b1c0d](https://github.com/cheminfo/biologic-converter/commit/79b1c0d1f2c6f35427eefb28e64f32dc9c5ec11f))
* several errors in the new feature ([61f6d4d](https://github.com/cheminfo/biologic-converter/commit/61f6d4de237025127e5bae40257a218eb295a5c9))

## [0.1.0](https://github.com/cheminfo/biologic-converter/compare/v0.0.1...v0.1.0) (2022-09-25)


### Features

* convert parse mpr ([17ec926](https://github.com/cheminfo/biologic-converter/commit/17ec926afec210cc2f944d70d6d3d85cfc52e5e1))


### Bug Fixes

* updated convert.ts and test ([#9](https://github.com/cheminfo/biologic-converter/issues/9)) ([71506d1](https://github.com/cheminfo/biologic-converter/commit/71506d1ecfdd9bfff5a474356c6ed6c2c8b59a6f))

## 0.0.1 (2022-09-08)


### Features

* add MPR parser ([8a349d1](https://github.com/cheminfo/biologic-converter/commit/8a349d12d16b68a983b2aec83d051368d04d8bec))
* added file grouping ([fe5e52c](https://github.com/cheminfo/biologic-converter/commit/fe5e52c29c3e67112caaabbb664e8d6897e22c9f))
* basic text parsing ([08ffb23](https://github.com/cheminfo/biologic-converter/commit/08ffb23208f3fe93b07f8f5c568a1ab44bb4a35b))
* new text parsing ([5468dca](https://github.com/cheminfo/biologic-converter/commit/5468dca1251a456de0e28f4bacfd5a1716070787))
* parse MPS ([abb69ab](https://github.com/cheminfo/biologic-converter/commit/abb69ab78eea867002175c0cad94bd5a6ca2b3b3))
* parse MPS ([7b6334b](https://github.com/cheminfo/biologic-converter/commit/7b6334b2554887736b190f3883b56372cd1641ba))
* read mpr header ([6e8784b](https://github.com/cheminfo/biologic-converter/commit/6e8784be35d10fae01c179b50e387ce7836cec6e))


### Bug Fixes

* getting rid of LineReader ([446d504](https://github.com/cheminfo/biologic-converter/commit/446d5046aef732cc073c6d671f03ad92ad17f34b))
* harmonized with filelist-utils groupFiles function ([8ae0cfe](https://github.com/cheminfo/biologic-converter/commit/8ae0cfedb2926a965f4f856161e7d1fa5c2534e3))
* improved all files. Still need to add groupFiles ([d472a44](https://github.com/cheminfo/biologic-converter/commit/d472a443e00910d7bdd9689dd38b272ea4c9973d))
* uses regex to remove some special cases ([e50cb27](https://github.com/cheminfo/biologic-converter/commit/e50cb274789c40a6be34bd3eab41900901327c41))


### Miscellaneous Chores

* force release ([c7b3fd5](https://github.com/cheminfo/biologic-converter/commit/c7b3fd5d83233ad5607a18c59345875c4c001071))
