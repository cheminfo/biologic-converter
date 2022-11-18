import { techniqueFromLongName } from '../techniqueFromLongName';

describe('techniqueFromLongName', () => {
  it('GCPL', () => {
    const res = techniqueFromLongName(
      'Galvanostatic Cycling with Potential Limitation',
    );
    expect(res.name).toBe('GCPL');
    expect(res.preParameters).toHaveLength(32);
  });
  it('CV', () => {
    expect(techniqueFromLongName('Cyclic Voltammetry').name).toBe('CV');
  });
  it('OCV', () => {
    expect(techniqueFromLongName('Open Circuit Voltage').name).toBe('OCV');
  });
  it('CA', () => {
    expect(
      techniqueFromLongName('Chronoamperometry / Chronocoulometry').name,
    ).toBe('CA');
  });
  it('CP', () => {
    expect(techniqueFromLongName('Chronopotentiometry').name).toBe('CP');
  });
  it('WAIT', () => {
    expect(techniqueFromLongName('Wait').name).toBe('WAIT');
  });
  it('PEIS', () => {
    expect(() =>
      techniqueFromLongName('Potentio Electrochemical Impedance Spectroscopy'),
    ).toThrow('Not implemented name: PEIS');
  });
  it('GEIS', () => {
    expect(() =>
      techniqueFromLongName('Galvano Electrochemical Impedance Spectroscopy'),
    ).toThrow('Not implemented name: GEIS');
  });
  it('ZIR', () => {
    expect(techniqueFromLongName('IR compensation (PEIS)').name).toBe('ZIR');
  });
  it('LSV', () => {
    expect(techniqueFromLongName('Linear Sweep Voltammetry').name).toBe('LSV');
  });
  it('MB', () => {
    expect(() => techniqueFromLongName('Modulo Bat')).toThrow(
      'Not implemented technique: MB',
    );
  });
  it('MIR', () => {
    expect(techniqueFromLongName('Manual IR compensation').name).toBe('MIR');
  });
  it('unknown', () => {
    expect(() => techniqueFromLongName('Morabi')).toThrow(
      'Unknown technique: Morabi',
    );
  });
});
