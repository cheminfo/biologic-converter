import { techniqueFromId } from '../techniqueFromId';
// the length is tested in technique from long name
describe('techniqueFromId', () => {
  it('GCPL', () => {
    expect(techniqueFromId(0x4).name).toBe('GCPL');
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
    expect(techniqueFromId(0x1d).name).toBe('PEIS');
  });
  it('GEIS', () => {
    expect(techniqueFromId(0x1e).name).toBe('GEIS');
  });
  it('ZIR', () => {
    expect(techniqueFromId(0x32).name).toBe('ZIR');
  });
  it('LSV', () => {
    expect(techniqueFromId(0x6c).name).toBe('LSV');
  });
  it('MB', () => {
    expect(techniqueFromId(0x7f).name).toBe(
      'Params not implemented for MB (id: 127)',
    );
  });
  it('unknown', () => {
    expect(techniqueFromId(0x123).name).toBe(
      'Params not implemented for id: 291',
    );
  });
});
