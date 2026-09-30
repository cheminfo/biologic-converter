import type { MeasurementVariable } from 'cheminfo-types';
import type { IOBuffer } from 'iobuffer';

import { dataColumns, flagColumns } from '../../utility/ids.ts';

import type { ModuleHeader } from './parseModuleHeader.ts';
import { readType, sizeOfType } from './utility/readType.ts';

export type ParseData = Record<string, MeasurementVariable>;

/** Where the records begin, relative to the module body, per format version. */
const RECORDS_OFFSET = { legacy2: 0x195, legacy3: 0x196, current: 0x3ef };

/** The first module version that counts its columns in sixteen bits. */
const WIDE_COLUMN_COUNT = 10;

/**
 * Read a data module: its columns, and one value of each per record.
 *
 * The record layout is written down nowhere in the file — it is the sum of the
 * declared columns' widths, plus one byte when the technique records flags. It
 * is therefore checked against the module's own declared length before any
 * value is read, and an unrecognised column id is refused rather than skipped.
 * Skipping one consumes no bytes, so every field after it comes from the wrong
 * offset and the module decodes into plausible numbers instead of an error.
 * @param buffer - positioned at the start of the module body
 * @param header - that module's header
 * @returns one entry per column, keyed by its label
 */
export function parseData(buffer: IOBuffer, header: ModuleHeader): ParseData {
  const zero = buffer.offset; // relative 0x0
  const dataPoints = buffer.readUint32(); // Number of datapoints
  // A version-11 module counts its columns in sixteen bits. Read as eight, the
  // count comes back plausible and the module decodes into nothing at all.
  const columns =
    header.version >= WIDE_COLUMN_COUNT
      ? buffer.readUint16()
      : buffer.readByte();
  const colIds = new Uint16Array(columns); // array of Ids of the columns

  const variables: ParseData = {};
  const nameOf = new Map<number, string>();
  let recordSize = 0;
  let flagByteCounted = false;

  for (let i = 0; i < columns; i++) {
    const id = buffer.readUint16();
    colIds[i] = id;
    const dataCol = dataColumns[id];
    const flagCol = flagColumns[id];

    if (dataCol !== undefined) {
      const name = uniqueName(variables, dataCol.name, id);
      nameOf.set(id, name);
      variables[name] = {
        label: dataCol.name,
        units: dataCol.unit,
        isDependent: id !== 0x04,
        data: new Float64Array(dataPoints),
      };
      recordSize += sizeOfType(dataCol.dType);
    } else if (flagCol !== undefined) {
      const name = uniqueName(variables, flagCol.name, id);
      nameOf.set(id, name);
      variables[name] = {
        label: flagCol.name,
        units: 'flag',
        isDependent: false,
        data: new Float64Array(dataPoints),
      };
      // Every flag of a record shares one byte, emitted once.
      if (!flagByteCounted) {
        recordSize += 1;
        flagByteCounted = true;
      }
    } else {
      throw new Error(
        `unknown column id 0x${id.toString(16)}: refusing to guess the record layout`,
      );
    }
  }

  // Start of datapoints varies between module versions.
  const start =
    header.version >= WIDE_COLUMN_COUNT
      ? RECORDS_OFFSET.current
      : header.version <= 2
        ? RECORDS_OFFSET.legacy2
        : RECORDS_OFFSET.legacy3;
  const planned = start + dataPoints * recordSize;
  if (planned !== header.length) {
    throw new Error(
      `record layout does not fit the module: ${planned} bytes planned against ${header.length} declared`,
    );
  }
  buffer.offset = zero + start;

  // Columns data gathering
  for (let i = 0; i < dataPoints; i++) {
    let flagByte = 256;
    for (const id of colIds) {
      const varName = nameOf.get(id) as string;
      if (flagColumns[id] !== undefined) {
        //undefined if not a column (flag + data columns have unique ids)
        if (flagByte === 256) flagByte = buffer.readByte();
        const { bitMask } = flagColumns[id];
        let twosComp = bitMask & -bitMask;
        let shift = -1;
        while (twosComp > 0) {
          twosComp >>= 1;
          shift++;
        }
        //mutates the variable object
        variables[varName].data[i] = (bitMask & flagByte) >> shift;
      } else {
        const { dType } = dataColumns[id];
        //mutates the variable object
        variables[varName].data[i] = readType(buffer, dType);
      }
    }
  }

  return variables;
}

/**
 * A key for a column that no other column already holds.
 *
 * Several ids share a label — `0x4d` and `0xae` are both `<Ewe>`, `0x0b` and
 * `0x4c` are both `<I>` — so a file declaring two of them would otherwise write
 * both into one array and lose the first. The id disambiguates the later one,
 * while `label` keeps the name the instrument uses.
 * @param variables - what has been named so far
 * @param label - the column's label
 * @param id - its numeric id
 * @returns the label, or the label with its id when the label is taken
 */
function uniqueName(variables: ParseData, label: string, id: number): string {
  if (variables[label] === undefined) return label;
  return `${label} (0x${id.toString(16)})`;
}
