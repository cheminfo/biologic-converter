import { techniqueFromLongName } from '../techniqueFromLongName';

describe('techniqueFromLongName', () => {
  it('GCPL', () => {
    const result = techniqueFromLongName(
      'Galvanostatic Cycling with Potential Limitation',
    );
    expect(result).toBe('GCPL');
  });
  it('CV', () => {
    const result = techniqueFromLongName('Cyclic Voltammetry');
    expect(result).toBe('CV');
  });
  it('OCV', () => {
    const result = techniqueFromLongName('Open Circuit Voltage');
    expect(result).toBe('OCV');
  });
  it('CA', () => {
    const result = techniqueFromLongName(
      'Chronoamperometry / Chronocoulometry',
    );
    expect(result).toBe('CA');
  });
  it('CP', () => {
    const result = techniqueFromLongName('Chronopotentiometry');
    expect(result).toBe('CP');
  });
  it('WAIT', () => {
    const result = techniqueFromLongName('Wait');
    expect(result).toBe('WAIT');
  });
  it('GEIS', () => {
    const result = techniqueFromLongName(
      'Galvano Electrochemical Impedance Spectroscopy',
    );
    expect(result).toBe('GEIS');
  });
  it('ZIR', () => {
    const result = techniqueFromLongName('IR compensation (PEIS)');
    expect(result).toBe('ZIR');
  });
  it('LSV', () => {
    const result = techniqueFromLongName('Linear Sweep Voltammetry');
    expect(result).toBe('LSV');
  });
  it('MIR', () => {
    const result = techniqueFromLongName('Manual IR compensation');
    expect(result).toBe('MIR');
  });
  it('MB', () => {
    expect(techniqueFromLongName('Modulo Bat')).toBe('MB');
  });
  it('PEIS', () => {
    const result = techniqueFromLongName(
      'Potentio Electrochemical Impedance Spectroscopy',
    );
    expect(result).toBe('PEIS');
  });
  it('unknown', () => {
    expect(techniqueFromLongName('Morabi')).toBe('Morabi');
  });
});
