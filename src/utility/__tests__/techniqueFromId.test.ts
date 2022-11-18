import { techniqueFromId } from '../techniqueFromId';

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
    expect(() => techniqueFromId(0x1d)).toThrow('Not implemented name: PEIS');
  });
  it('GEIS', () => {
    expect(() => techniqueFromId(0x1e)).toThrow('Not implemented name: GEIS');
  });
  it('ZIR', () => {
    expect(techniqueFromId(0x32).name).toBe('ZIR');
  });
  it('LSV', () => {
    expect(techniqueFromId(0x6c).name).toBe('LSV');
  });
  it('MB', () => {
    expect(() => techniqueFromId(0x7f)).toThrow('Not implemented name: MB');
  });
  it('unknown', () => {
    expect(() => techniqueFromId(0x123)).toThrow(
      'Not implemented name: unknown (0x123)',
    );
  });
});
