import { Param as InParam } from './preParamsLookUp';
import { Technique } from './techniqueFromId';

/**
 * Each parameter object
 */
interface OutParam {
  value: string | number | (string | number)[];
  units?: string;
}
/**
 * Stores all parameters with value and optionally units
 */
export interface OutParams {
  [name: string]: OutParam;
}
/**
 * This are values that the user inputs in a dialog box, as parameters of the technique.
 */
export type GetTechniqueParameters = (
  metaParams: Technique['preParameters'],
  lines: string[],
  i: number,
) => [OutParams, number];

/**
 * Parses technique from text file
 * @param lines - lines to read
 * @param i - index to start reading
 * @return `[params, newIndex]`, `boolean` indicates whether is a known technique
 */
export const getParams: GetTechniqueParameters = function getParams(
  metaParams,
  lines,
  i,
) {
  let params: OutParams = {};

  if (lines[i].startsWith('Ns ')) {
    metaParams.unshift({
      name: 'Ns',
      textReadType: 'int',
      mprReadType: 'Uint8',
      optional: false,
    });
  }
  for (const thisParam of metaParams) {
    const paramLine = lines[i].trim();
    if (paramLine === '') break;

    const [longParameterName, ...paramValues] = paramLine.split(/\s{2,}/);
    if (!longParameterName || !paramValues) {
      throw new Error('expected at least 2 values.');
    } else if (!thisParam.optional) {
      params[thisParam.name] = setThisParameter(
        thisParam,
        longParameterName,
        paramValues,
      );
    } else if (paramLine.startsWith(thisParam.name)) {
      params[thisParam.name] = setThisParameter(
        thisParam,
        longParameterName,
        paramValues,
      );
    } else {
      continue;
    }
    i++;
  }
  return [params, i];
};

/**
 *
 * @param metaParam
 * @param longParameterName
 * @param paramValues
 * @returns
 */
function setThisParameter(
  metaParam: InParam,
  longParameterName: string,
  paramValues: string[],
): OutParam {
  const { regexUnits, textReadType } = metaParam;

  let param: Partial<OutParam> = {};

  if (regexUnits) {
    //units from name
    const result = regexUnits.exec(longParameterName.trim());
    if (result?.groups?.units) {
      param.units = result.groups.units;
    }
  }

  if (textReadType === 'string') {
    param.value = paramValues.length === 1 ? paramValues[0] : paramValues;
  } else if (textReadType === 'float' || textReadType === 'float|string') {
    const result = paramValues.map((v) => {
      const n = Number.parseFloat(v);
      return Number.isNaN(n) ? v : n;
    });
    param.value = result.length === 1 ? result[0] : result;
  } else if (textReadType === 'int' || textReadType === 'int|string') {
    const result = paramValues.map((v) => {
      const n = Number.parseInt(v, 10);
      return Number.isNaN(n) ? v : n;
    });
    param.value = result.length === 1 ? result[0] : result;
  }
  return param as OutParam;
}
