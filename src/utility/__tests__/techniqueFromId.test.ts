import { describe, expect, it } from 'vitest';

import { techniqueFromId } from '../techniqueFromId.ts';

describe('techniqueFromId', () => {
  it('GCPL', () => {
    const res = techniqueFromId(0x4);
    expect(res.name).toBe('GCPL');
    expect(res.preParameters).toHaveLength(32);
  });
  it('CV', () => {
    expect(techniqueFromId(0x6).name).toBe('CV');
  });
  it('OCV', () => {
    expect(techniqueFromId(0xb).name).toBe('OCV');
  });
  it('CA', () => {
    expect(techniqueFromId(0x18).name).toBe('CA');
  });
  it('CP', () => {
    expect(techniqueFromId(0x19).name).toBe('CP');
  });
  it('WAIT', () => {
    expect(techniqueFromId(0x1c).name).toBe('WAIT');
  });
  it('PEIS', () => {
    // Named, with no parameter block mapped yet: the data is still read.
    expect(techniqueFromId(0x1d).name).toBe('PEIS');
    expect(techniqueFromId(0x1d).preParameters).toStrictEqual([]);
  });
  it('GEIS', () => {
    // Named, with no parameter block mapped yet: the data is still read.
    expect(techniqueFromId(0x1e).name).toBe('GEIS');
    expect(techniqueFromId(0x1e).preParameters).toStrictEqual([]);
  });
  it('ZIR', () => {
    expect(techniqueFromId(0x32).name).toBe('ZIR');
  });
  it('LSV', () => {
    expect(techniqueFromId(0x6c).name).toBe('LSV');
  });
  it('MB', () => {
    // Named, with no parameter block mapped yet: the data is still read.
    expect(techniqueFromId(0x7f).name).toBe('MB');
    expect(techniqueFromId(0x7f).preParameters).toStrictEqual([]);
  });
  it('unknown', () => {
    expect(() => techniqueFromId(0x123)).toThrow(
      'Not implemented name: unknown (0x123)',
    );
  });
});
