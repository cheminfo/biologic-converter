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

  for (let i = 0; i < columns; i++) {
    const id = buffer.readUint16();
    colIds[i] = id;
    if (flagColumns[id] !== undefined) {
      units[i] = 'flag';
    } else if (dataColumns[id] !== undefined) {
      units[i] = dataColumns[id].unit;
    }
  }

  const variables: Record<string, Partial<VarsChild>> = {};

  // Starts of datapoints vary between module versions
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
        if (flagByte === 256) flagByte = buffer.readByte();
        const { bitMask, name: flagName } = flagColumns[id];
        let twosComp = bitMask & -bitMask;
        let shift = -1;
        while (twosComp > 0) {
          twosComp >>= 1;
          shift++;
        }

        const varsKeyName = flagName;
        let varsChildObject: Partial<VarsChild> = variables[varsKeyName] || {};

        varsChildObject = addData(
          varsChildObject,
          (bitMask & flagByte) >> shift,
        ); //adds data key or pushes to data key
        if (!varsChildObject.label) {
          //addLabel prop
          varsChildObject.label = varsKeyName;
        }
        if (!varsChildObject.units) {
          //add units prop
          varsChildObject.units = '';
        }
        variables[varsKeyName] = varsChildObject; //reassign
      } else if (dataColumns[id] !== undefined) {
        const dat = dataColumns[id]; //[dataType, name, unit]
        const varsKeyName = dat.name;
        let varsChildObject: Partial<VarsChild> = variables[varsKeyName] || {};

        const read = readType(buffer, dat.dType);
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
          varsChildObject.label = varsKeyName;
        }
        if (!varsChildObject.units) {
          varsChildObject.units = dat.unit;
        }
        variables[varsKeyName] = varsChildObject; //now reassign
      }
    }
  }
  return variables as ParseData;
}
