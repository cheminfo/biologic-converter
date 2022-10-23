import { MeasurementVariable } from 'cheminfo-types';
import { IOBuffer } from 'iobuffer';

import { getOneLetter } from '../../utility/getOneLetter';
import { flagColumns, dataColumns } from '../../utility/ids';

import { ModuleHeader } from './parseModuleHeader';
import { readType } from './utility/readType';

export type ParseData = Record<string, MeasurementVariable>;

export function parseData(buffer: IOBuffer, header: ModuleHeader): ParseData {
  const zero = buffer.offset; // relative 0x0
  const dataPoints = buffer.readUint32(); // Number of datapoints
  const columns = buffer.readByte(); // Number of columns
  const colIds = new Uint16Array(columns); // array of Ids of the columns

  const variables: ParseData = {};

  for (let i = 0; i < columns; i++) {
    //we set the variables object
    const id = buffer.readUint16();
    colIds[i] = id;
    const dataCol = dataColumns[id];
    if (dataCol !== undefined) {
      variables[dataCol.name] = {
        label: dataCol.name,
        units: dataCol.unit,
        isDependent: id !== 0x04,
        data: new Float64Array(dataPoints),
      };
    } else if (flagColumns[id] !== undefined) {
      const flagCol = flagColumns[id];
      variables[flagCol.name] = {
        label: flagCol.name,
        units: 'flag',
        isDependent: false,
        data: [],
      };
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
        //mutates the variable object
        const newValue = (bitMask & flagByte) >> shift;
        variables[varName].data[i] = Number(newValue);
      } else if (dataColumns[id] !== undefined) {
        const { name: varName, dType } = dataColumns[id];
        const read = readType(buffer, dType);
        //mutates the variable object
        variables[varName].data[i] = Number(read);
      }
    }
  }

  // use single letters starting from a to z (lowercases)
  const oneLetterVariables: Partial<ParseData> = {};

  const allVarKeys = Object.keys(variables);
  for (let i = 0; i < allVarKeys.length; i++) {
    const oneLetter = getOneLetter(i);
    oneLetterVariables[oneLetter] = variables[allVarKeys[i]];
  }
  return oneLetterVariables as ParseData;
}
