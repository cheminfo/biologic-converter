/**
 * Technique Parameter
 */
export interface Param {
  name: string;
  mprReadType: string;
  textReadType: string;
  regexUnits?: RegExp; //to unit extracts from name
}
interface TechniquesToParams {
  [techniqueName: string]: Param[];
}

/**
 * The values are ordered in the way they appear in the binary and text file,
 * names are similar but not the same (they aren't the same even across techniques)
 * The parameter `Ns` is complicated it is inferred at parsing time, not here are as
 * all the other parameters.
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
    },
    { name: 'Ei vs.', mprReadType: 'Uint8', textReadType: 'string' },
    {
      name: 'ti',
      mprReadType: 'Float32',
      textReadType: 'string',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'Imax', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit Imax', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'Imin', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit Imin', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'dQM', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit dQM', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'record', mprReadType: 'Uint8', textReadType: 'int|string' },
    { name: 'dI', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit dI', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'dQ', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit dQ', mprReadType: 'Uint8', textReadType: 'string' },
    {
      name: 'dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dta',
      mprReadType: 'Float32',
      regexUnits: / \((?<units>.*)\)/,
      textReadType: 'float',
    },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'I Range', mprReadType: 'Uint8', textReadType: 'float|string' },
    { name: 'I Range min', mprReadType: 'Uint8', textReadType: 'float|string' },
    { name: 'I Range max', mprReadType: 'Uint8', textReadType: 'float|string' },
    {
      name: 'I Range init',
      mprReadType: 'Uint8',
      textReadType: 'float|string',
    },
    { name: 'Bandwidth', mprReadType: 'Uint8', textReadType: 'int' },
    { name: 'goto Ns', mprReadType: 'Uint32', textReadType: 'int' },
    { name: 'nc cycles', mprReadType: 'Uint32', textReadType: 'int' },
  ],
  cpParams: [
    { name: 'Is', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit Is', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'Is vs.', mprReadType: 'Uint8', textReadType: 'string' },
    {
      name: 'ts',
      mprReadType: 'Float32',
      textReadType: 'string',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'EM',
      mprReadType: 'Float32',
      textReadType: 'float|string',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'dQM', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit dQM', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'record', mprReadType: 'Uint8', textReadType: 'int|string' },
    { name: 'dEs', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'dts', mprReadType: 'Float32', textReadType: 'float' },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'I Range', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'Bandwidth', mprReadType: 'Uint8', textReadType: 'int' },
    { name: 'goto Ns', mprReadType: 'Uint32', textReadType: 'int' },
    { name: 'nc cycles', mprReadType: 'Uint32', textReadType: 'int' },
  ],
  cvParams: [
    {
      name: 'Ei',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: /Ei \((?<units>.*)\)/,
    },
    { name: 'Ei vs.', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'dE/dt', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'dE/dt unit', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'E1', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'E1 vs.', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'Step percent', mprReadType: 'Uint8', textReadType: 'int' },
    { name: 'N', mprReadType: 'Uint32', textReadType: 'int' },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'I Range', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'I Range min', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'I Range max', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'I Range init', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'Bandwidth', mprReadType: 'Uint8', textReadType: 'int' },
    {
      name: 'E2',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'E2 vs.', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'nc cycles', mprReadType: 'Uint32', textReadType: 'int' },
    { name: 'Reverse Scan', mprReadType: 'Uint8', textReadType: 'int' },
    {
      name: 'Ef',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'Ef vs.', mprReadType: 'Uint8', textReadType: 'string' },
  ],
  gcplParams: [
    { name: 'set I/C', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'Is', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit Is', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'Is vs.', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'N', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'I sign', mprReadType: 'Uint8', textReadType: 'string' },
    {
      name: 't1',
      mprReadType: 'Float32',
      textReadType: 'string',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'I Range', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'Bandwidth', mprReadType: 'Uint8', textReadType: 'int' },
    {
      name: 'dE1',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dt1',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'EM',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'tM',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'Im', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit Im', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'dI/dt', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'dunit dI/dt', mprReadType: 'Uint8', textReadType: 'string' },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'dq', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit dq', mprReadType: 'Uint8', textReadType: 'string' },
    {
      name: 'dtq',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'dQM', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit dQM', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'dxM', mprReadType: 'Float32', textReadType: 'float' },
    {
      name: 'tR',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dER/dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dER',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dtR',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'EL',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'goto Ns', mprReadType: 'Uint32', textReadType: 'int' },
    { name: 'nc cycles', mprReadType: 'Uint32', textReadType: 'int' },
  ],
  lsvParams: [
    {
      name: 'tR',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dER/dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dER',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dtR',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'dE/dt', mprReadType: 'Float32', textReadType: 'float' },
    {
      name: 'dE/dt unit',
      mprReadType: 'Uint8',
      textReadType: 'string',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'Ei',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'Ei vs.', mprReadType: 'Uint8', textReadType: 'string' },
    {
      name: 'EL',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'EL vs.', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'record', mprReadType: 'Uint8', textReadType: 'int|string' },
    { name: 'dI', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit dI', mprReadType: 'Uint8', textReadType: 'string' },
    {
      name: 'ti',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'step percent', mprReadType: 'Uint8', textReadType: 'int' },
    { name: 'N', mprReadType: 'Uint32', textReadType: 'int' },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'I Range', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'I Range min', mprReadType: 'Uint8', textReadType: 'float|string' },
    { name: 'I Range max', mprReadType: 'Uint8', textReadType: 'float|string' },
    {
      name: 'I Range init',
      mprReadType: 'Uint8',
      textReadType: 'float|string',
    },
    { name: 'Bandwidth', mprReadType: 'Uint8', textReadType: 'int' },
  ],
  waitParams: [
    { name: 'select', mprReadType: 'Uint8', textReadType: 'int' },
    {
      name: 'td',
      mprReadType: 'Uint32',
      textReadType: 'string',
      regexUnits: /(?<units>.*)/,
    },
    { name: 'from', mprReadType: 'Uint8', textReadType: 'int' },
    { name: 'tech. num.', mprReadType: 'Uint8', textReadType: 'int' },
    {
      name: 'date',
      mprReadType: 'Float32',
      textReadType: 'string',
      regexUnits: /(?<units>.*)/,
    },
    {
      name: 'time',
      mprReadType: 'Float32',
      textReadType: 'string',
      regexUnits: /(?<units>.*)/,
    },
    { name: 'record', mprReadType: 'Uint8', textReadType: 'int|string' },
    {
      name: 'dE',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'dI', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit dI', mprReadType: 'Uint8', textReadType: 'string' },
    {
      name: 'dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
  ],
  zirParams: [
    {
      name: 'E',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'E vs.', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'f', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit f', mprReadType: 'Uint8', textReadType: 'string' },
    {
      name: 'Va',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'pw', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'Na', mprReadType: 'Uint32', textReadType: 'int' },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'I Range', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'Bandwidth', mprReadType: 'Uint8', textReadType: 'int' },
    {
      name: 'comp. level',
      mprReadType: 'Uint8',
      textReadType: 'int',
      regexUnits: / \((?<units>.*)\)/,
    },
    { name: 'use results', mprReadType: 'Uint8', textReadType: 'int' },
    { name: 'comp mode', mprReadType: 'Uint8', textReadType: 'string' },
  ],
  mirParams: [
    { name: 'Ru', mprReadType: 'Float32', textReadType: 'float' },
    { name: 'unit Ru', mprReadType: 'Uint8', textReadType: 'string' },
    { name: 'comp level', mprReadType: 'Uint8', textReadType: 'int' },
    { name: 'comp mode', mprReadType: 'Uint8', textReadType: 'string' },
  ],
  ocvParams: [
    {
      name: 'tR',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dER/dt',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dER',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'dtR',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E range min',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
    {
      name: 'E range max',
      mprReadType: 'Float32',
      textReadType: 'float',
      regexUnits: / \((?<units>.*)\)/,
    },
  ],
};
