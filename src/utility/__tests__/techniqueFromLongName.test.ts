import { techniqueFromLongName } from '../techniqueFromLongName';

describe('techniqueFromLongName', () => {
  it('GCPL', () => {
    const { name, preParameters } = techniqueFromLongName(
      'Galvanostatic Cycling with Potential Limitation',
    );
    expect(name).toBe('GCPL');
    expect(preParameters).toHaveLength(32);
  });
  it('CV', () => {
    const { name, preParameters } = techniqueFromLongName('Cyclic Voltammetry');
    expect(name).toBe('CV');
    expect(preParameters).toHaveLength(21);
  });
  it('OCV', () => {
    const { name, preParameters } = techniqueFromLongName(
      'Open Circuit Voltage',
    );
    expect(name).toBe('OCV');
    expect(preParameters).toHaveLength(7);
  });
  it('CA', () => {
    const { name, preParameters } = techniqueFromLongName(
      'Chronoamperometry / Chronocoulometry',
    );
    expect(name).toBe('CA');
    expect(preParameters).toHaveLength(25);
  });
  it('CP', () => {
    const { name, preParameters } = techniqueFromLongName(
      'Chronopotentiometry',
    );
    expect(name).toBe('CP');
    expect(preParameters).toHaveLength(16);
  });
  it('WAIT', () => {
    const { name, preParameters } = techniqueFromLongName('Wait');
    expect(name).toBe('WAIT');
    expect(preParameters).toHaveLength(11);
  });
  it('GEIS', () => {
    const { name, preParameters } = techniqueFromLongName(
      'Galvano Electrochemical Impedance Spectroscopy',
    );
    expect(name).toBe('GEIS');
    expect(preParameters).toHaveLength(55);
  });
  it('ZIR', () => {
    const { name, preParameters } = techniqueFromLongName(
      'IR compensation (PEIS)',
    );
    expect(name).toBe('ZIR');
    expect(preParameters).toHaveLength(14);
  });
  it('LSV', () => {
    const { name, preParameters } = techniqueFromLongName(
      'Linear Sweep Voltammetry',
    );
    expect(name).toBe('LSV');
    expect(preParameters).toHaveLength(23);
  });
  it('MIR', () => {
    const { name, preParameters } = techniqueFromLongName(
      'Manual IR compensation',
    );
    expect(name).toBe('MIR');
    expect(preParameters).toHaveLength(4);
  });
  it('MB', () => {
    expect(() => techniqueFromLongName('Modulo Bat')).toThrow(
      'Not implemented technique: MB',
    );
  });
  it('PEIS', () => {
    const { name, preParameters } = techniqueFromLongName(
      'Potentio Electrochemical Impedance Spectroscopy',
    );
    expect(name).toBe('PEIS');
    expect(preParameters).toHaveLength(52);
  });
  it('unknown', () => {
    expect(() => techniqueFromLongName('Morabi')).toThrow(
      'Unknown technique: Morabi',
    );
  });
});
