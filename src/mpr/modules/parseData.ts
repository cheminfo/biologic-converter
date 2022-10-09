import { IOBuffer } from 'iobuffer';

import { flagColumns, dataColumns, unitsScale } from '../ids';

import { ModuleHeader } from './parseModuleHeader';
import { addData } from './utility/addData';
import { readType } from './utility/readType';

export interface VarsChild {
  data: (number | string)[];
  label: string;
  units: string;
}
export type ParseData = Record<string, VarsChild>;

export function parseData(buffer: IOBuffer, header: ModuleHeader): ParseData {
  const zero = buffer.offset; // relative 0x0
  const dataPoints = buffer.readUint32(); // Number of datapoints
  const columns = buffer.readByte(); // Number of columns
  const colIds = new Uint16Array(columns); // array of Ids of the columns
  const units = new Array<string>(columns); // Units for each column

  const variables: Record<string, Partial<VarsChild>> = {};

  for (let i = 0; i < columns; i++) {
    const id = buffer.readUint16();
    colIds[i] = id;
    if (flagColumns[id] !== undefined) {
      units[i] = 'flag';
    } else if (dataColumns[id] !== undefined) {
      units[i] = dataColumns[id].unit;
    }
  }

  // Start of datapoints vary between module versions
  if (header.version <= 2) {
    buffer.offset = zero + 0x195;
  } else {
    buffer.offset = zero + 0x196;
  }

  // Columns data gathering
  for (let i = 0; i < dataPoints; i++) {
    let flagByte = 256;
    for (const id of colIds) {
      if (flagColumns[id] !== undefined) {
        //undefined if not a column (flag + data columns have unique ids)
        if (flagByte === 256) flagByte = buffer.readByte();
        const { bitMask, name: varName } = flagColumns[id];
        let twosComp = bitMask & -bitMask;
        let shift = -1;
        while (twosComp > 0) {
          twosComp >>= 1;
          shift++;
        }

        let varsChildObject: Partial<VarsChild> = variables[varName] || {};

        varsChildObject = addData(
          varsChildObject,
          (bitMask & flagByte) >> shift,
        ); //adds data key or pushes to data key
        if (!varsChildObject.label) {
          //addLabel prop
          varsChildObject.label = varName;
        }
        if (!varsChildObject.units) {
          //add units prop
          varsChildObject.units = '';
        }
        variables[varName] = varsChildObject; //reassign
      } else if (dataColumns[id] !== undefined) {
        const { name: varName, dType, unit } = dataColumns[id];
        let varsChildObject: Partial<VarsChild> = variables[varName] || {};

        const read = readType(buffer, dType);
        if (id === 0x27) {
          // If ID is I Range
          varsChildObject = addData(
            varsChildObject,
            unitsScale('I_range', read),
          );
        } else {
          varsChildObject = addData(varsChildObject, read);
        }
        if (!varsChildObject.label) {
          //addLabel
          varsChildObject.label = varName;
        }
        if (!varsChildObject.units) {
          varsChildObject.units = unit;
        }
        variables[varName] = varsChildObject; //now reassign
      }
    }
  }
  return variables as ParseData;
}
