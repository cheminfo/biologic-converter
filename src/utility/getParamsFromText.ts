import { Param as InParam } from './preParamsLookUp';
import { Technique } from './techniqueFromId';

/**
 * Object with this type helps to produce the out parameters
 */
type MetaParams = Technique['preParameters'];

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

export type GetParams = (
  metaParams: MetaParams,
  lines: string[],
  i: number,
) => [OutParams, number];

/**
 * Parses technique from the _.mps_ file
 * @param lines - lines to read
 * @param i - index to start reading
 * @return `[params, newIndex]`, `boolean` indicates whether is a known technique
 */
export const getParams: GetParams = function getParams(metaParams, lines, i) {
  let params: OutParams = {};

  const initAt = i;
  if (lines[i].startsWith('Ns ')) {
    metaParams.unshift({
      name: 'Ns',
      textReadType: 'int',
      mprReadType: 'Uint8',
    });
  }
  for (let j = 0; j < metaParams.length; j++) {
    const paramLine = lines[j + initAt].trim();
    if (paramLine === '') break;

    const [longParameterName, ...paramValues] = paramLine.split(/\s{2,}/); //weak regex but seems ok.

    if (!longParameterName || !paramValues) {
      throw new Error('expected at least 2 values.');
    } else {
      /*order params in text file is === as in index `j`*/
      params[metaParams[j].name] = setThisParameter(
        metaParams[j],
        longParameterName,
        paramValues,
      );
    }
    i++;
  }
  return [params, i - 1];
};

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
      const n = parseFloat(v);
      return isNaN(n) ? v : n;
    });
    param.value = result.length === 1 ? result[0] : result;
  } else if (textReadType === 'int' || textReadType === 'int|string') {
    const result = paramValues.map((v) => {
      const n = parseInt(v, 10);
      return isNaN(n) ? v : n;
    });
    param.value = result.length === 1 ? result[0] : result;
  }
  return param as OutParam;
}
