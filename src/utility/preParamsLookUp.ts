/**
 * Technique Parameter
 */
export interface Param {
  name: string;
  mprReadType: string;
  textReadType: string;
  regexUnits?: RegExp; //to unit extracts from name
  optional: boolean;
}
interface TechniquesToParams {
  [techniqueName: string]: Param[];
}

/**
 * Parameters ordered in the way they appear in the binary file,
 * `optional` is to help the text parsing.
 * For this to work in the text files, `name` must be name in the MPT file.
 * The text-only parameter `Ns` appended at parsing time (it does not appear in the
 * binary file.)
 * For description of parameters see the manuals
 * in the GH repo at `/docs`.
 */
export const preParamsLookUp: TechniquesToParams = {
  caParams: [
    {
      name: 'Ei',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: /Ei \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'ti',
      mprReadType: 'Float32',
      textReadType: 'string',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dta',
      mprReadType: 'Float32',
      regexUnits: / \((?<units>.*)\)/,
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'I Range max',
      mprReadType: 'Uint8',
      textReadType: 'float|string',
      optional: false,
    },
    {
      name: 'I Range init',
      mprReadType: 'Uint8',
      textReadType: 'float|string',
      optional: false,
    },
    {
      name: 'Bandwidth',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'goto Ns',
      mprReadType: 'Uint32',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'nc cycles',
      mprReadType: 'Uint32',
      textReadType: 'int',
      optional: false,
    },
  ],
  cpParams: [
    {
      name: 'Is',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit Is',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Is vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'ts',
      mprReadType: 'Float32',
      textReadType: 'string',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'EM',
      mprReadType: 'Float32',
      textReadType: 'float|string',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dQM',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit dQM',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'record',
      mprReadType: 'Uint8',
      textReadType: 'int|string',
      optional: false,
    },
    {
      name: 'dEs',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'dts',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'I Range',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Bandwidth',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'goto Ns',
      mprReadType: 'Uint32',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'nc cycles',
      mprReadType: 'Uint32',
      textReadType: 'int',
      optional: false,
    },
  ],
  cvParams: [
    {
      name: 'Ei',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: /Ei \((?<units>.*)\)/,
      ptional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'dE/dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'dE/dt unit',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'E1',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'E1 vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Step percent',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    { name: 'N', mprReadType: 'Uint32', textReadType: 'int', optional: false },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'I Range',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'I Range min',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'I Range max',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'I Range init',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Bandwidth',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'E2',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'E2 vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'nc cycles',
      mprReadType: 'Uint32',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'Reverse Scan',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'Ef',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'Ef vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
  ],
  gcplParams: [
    {
      name: 'set I/C',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Is',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit Is',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Is vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'N',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'I sign',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 't1',
      mprReadType: 'Float32',
      textReadType: 'string',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'I Range',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Bandwidth',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'dE1',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dt1',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'EM',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'tM',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'Im',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit Im',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'dI/dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'dunit dI/dt',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dq',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit dq',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'dtq',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dQM',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit dQM',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'dxM',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'tR',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dER/dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dER',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dtR',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'EL',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'goto Ns',
      mprReadType: 'Uint32',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'nc cycles',
      mprReadType: 'Uint32',
      textReadType: 'int',
      optional: false,
    },
  ],
  lsvParams: [
    {
      name: 'tR',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dER/dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dER',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dtR',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dE/dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'dE/dt unit',
      mprReadType: 'Uint8',
      textReadType: 'string',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'Ei',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'Ei vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'EL',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'EL vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'record',
      mprReadType: 'Uint8',
      textReadType: 'int|string',
      optional: false,
    },
    {
      name: 'dI',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit dI',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'ti',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'step percent',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    { name: 'N', mprReadType: 'Uint32', textReadType: 'int', optional: false },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'I Range',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'I Range min',
      mprReadType: 'Uint8',
      textReadType: 'float|string',
      optional: false,
    },
    {
      name: 'I Range max',
      mprReadType: 'Uint8',
      textReadType: 'float|string',
      optional: false,
    },
    {
      name: 'I Range init',
      mprReadType: 'Uint8',
      textReadType: 'float|string',
      optional: false,
    },
    {
      name: 'Bandwidth',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
  ],
  waitParams: [
    {
      name: 'select',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'td',
      mprReadType: 'Uint32',
      textReadType: 'string',
      regexUnits: /(?<units>.*)/,
      optional: false,
    },
    {
      name: 'from',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'tech. num.',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'date',
      mprReadType: 'Float32',
      textReadType: 'string',
      regexUnits: /(?<units>.*)/,
      optional: false,
    },
    {
      name: 'time',
      mprReadType: 'Float32',
      textReadType: 'string',
      regexUnits: /(?<units>.*)/,
      optional: false,
    },
    {
      name: 'record',
      mprReadType: 'Uint8',
      textReadType: 'int|string',
      optional: false,
    },
    {
      name: 'dE',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dI',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit dI',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
  ],
  zirParams: [
    {
      name: 'E',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'E vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'f',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit f',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Va',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'pw',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    { name: 'Na', mprReadType: 'Uint32', textReadType: 'int', optional: false },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'I Range',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Bandwidth',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'comp. level',
      mprReadType: 'Uint8',
      textReadType: 'int',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'use results',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'comp mode',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
  ],
  mirParams: [
    {
      name: 'Ru',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit Ru',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'comp level',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'comp mode',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
  ],
  ocvParams: [
    {
      name: 'tR',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dER/dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dER',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dtR',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
  ],
  geisParams: [
    {
      name: 'Mode',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Is',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit Is',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Is vs.',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'tIs',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'record',
      mprReadType: 'Uint8',
      textReadType: 'int|string',
      optional: false,
    },
    {
      name: 'dE',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'fi',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit fi',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'ff',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit ff',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    { name: 'Nd', mprReadType: 'Uint32', textReadType: 'int', optional: false },
    {
      name: 'Points',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'spacing',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ia/Va',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Ia',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'unit Ia',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'va pourcent',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    {
      name: 'pw',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: false,
    },
    { name: 'Na', mprReadType: 'Uint32', textReadType: 'int', optional: false },
    {
      name: 'corr',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'lim nb',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit type1',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit comp1',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit value1',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: true,
    },
    {
      name: 'limit unit1',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit type2',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit comp2',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit value2',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: true,
    },
    {
      name: 'limit unit2',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit type3',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit comp3',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit value3',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: true,
    },
    {
      name: 'limit unit3',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit type4',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit comp4',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit value4',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: true,
    },
    {
      name: 'limit unit4',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit type5',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit comp5',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit value5',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: true,
    },
    {
      name: 'limit unit5',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit type6',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit comp6',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'limit value6',
      mprReadType: 'Float32',
      textReadType: 'float',
      optional: true,
    },
    {
      name: 'limit unit6',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: true,
    },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
      optional: false,
    },
    {
      name: 'I Range',
      mprReadType: 'Uint8',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'Bandwidth',
      mprReadType: 'Uint8',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'nc cycles',
      mprReadType: 'Uint32',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'goto Ns',
      mprReadType: 'Uint32',
      textReadType: 'string',
      optional: false,
    },
    {
      name: 'nr cycles',
      mprReadType: 'Uint32',
      textReadType: 'int',
      optional: false,
    },
    {
      name: 'inc. cycle',
      mprReadType: 'Uint32',
      textReadType: 'int',
      optional: false,
    },
  ],
};
