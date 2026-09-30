import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { parseMPR } from '../parseMPR.ts';

const testFiles = join(__dirname, '/../../__tests__/data/all/geis-peis');

/**
 * Read one of the linked techniques of the reference experiment.
 * @param name - the file's base name
 * @returns the parsed record
 */
function read(name: string) {
  return parseMPR(readFileSync(join(testFiles, `${name}.mpr`)));
}

describe('EC-Lab 11.72 linked experiment', () => {
  it('reads a module whose length is written as a 64-bit escape', () => {
    // EC-Lab >= 11.5 writes 0xFFFFFFFF then the real length as 64 bits. Taking
    // the sentinel at face value lands eight bytes early, inside the module's
    // ASCII date, and the technique byte reads as the character '0'.
    const mpr = read('geis');

    expect(mpr.name).toBe('BIO-LOGIC MODULAR FILE');
    expect(mpr.settings.variables.technique).toBe('GEIS');
    expect(mpr.data.header.version).toBe(11);
  });

  it('counts the columns of a version-11 module in sixteen bits', () => {
    // Read as eight bits the count comes back plausible and the module decodes
    // into no variables at all, without an error.
    const geis = read('geis');
    const peis = read('peis');

    expect(Object.keys(geis.data.variables)).toHaveLength(53);
    expect(Object.keys(peis.data.variables)).toHaveLength(53);
    expect(geis.data.variables.time.data).toHaveLength(1876);
    expect(peis.data.variables.time.data).toHaveLength(9190);
  });

  it('starts the records at the version-11 offset', () => {
    const { time } = read('geis').data.variables;

    expect(time.data[0]).toBeCloseTo(1.2756000606168527, 12);
    expect(time.data[1875]).toBeCloseTo(2108.3277001402166, 10);
  });

  it('reads the three Ece quality indicators that shift the record', () => {
    // 0x1db, 0x1de and 0x1e1 were absent from the id table. An absent id is a
    // column that consumes no bytes, so the record was read 12 bytes narrow
    // and every field after them came from the wrong offset.
    const { variables } = read('geis').data;

    expect(variables['THD Ece']).toBeDefined();
    expect(variables['NSD Ece']).toBeDefined();
    expect(variables['NSR Ece']).toBeDefined();
    // And the harmonics past the second are no longer all labelled h7.
    expect(Object.keys(variables)).toContain('|Ece h3|');
    expect(Object.keys(variables)).toContain('|Ece h6|');
  });

  it('names PEIS and GEIS instead of refusing them', () => {
    expect(read('peis').settings.variables.technique).toBe('PEIS');
    expect(read('geis').settings.variables.technique).toBe('GEIS');
  });

  it('reads more than 52 columns', () => {
    // The variables used to be renamed to a..z then A..Z, which threw on the
    // fifty-third column of exactly these files.
    expect(Object.keys(read('peis').data.variables).length).toBeGreaterThan(52);
  });

  it('linked techniques share one experiment start and one time axis', () => {
    const geis = read('geis');
    const lsv = read('lsv-linked');
    const peis = read('peis');

    // The OLE Automation date is the start of the experiment, not of the
    // technique, so all three carry the same value.
    const started = geis.log?.variables.oleTimestamp;
    expect(started).toBeCloseTo(46_289.430_250_428_24, 10);
    expect(lsv.log?.variables.oleTimestamp).toBe(started);
    expect(peis.log?.variables.oleTimestamp).toBe(started);

    // And `time` runs continuously across them.
    expect(lsv.data.variables.time.data[0]).toBeGreaterThan(
      geis.data.variables.time.data[1875],
    );
    expect(peis.data.variables.time.data[0]).toBeGreaterThan(
      lsv.data.variables.time.data[604],
    );
  });
});
