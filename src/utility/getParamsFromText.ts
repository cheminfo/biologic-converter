import { TechniqueLookUp } from './techniquesAndParams';

/**
 * Each parameter object
 */
interface Param {
  value: string | number | (string | number)[];
  units?: string;
}
/**
 * All paramaters
 */
interface OutParams {
  [name: string]: Param;
}
export type GetParams = (
  metaParams: TechniqueLookUp['preParameters'],
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

  // TODO: fix Ns
  const initAt = i;
  for (let j = 0; j < metaParams.length - 1; j++) {
    const paramLine = lines[j + initAt].trim();
    if (paramLine === '') break;

    const { name: paramName, regexUnits, mpsReadType } = metaParams[j];
    let [fullName, ...paramValues] = paramLine.split(/\s{2,}/); //leave technique name out

    if (!paramValues) {
      throw new Error('expected at least 2 values.');
    } else {
      //we have the parameter
      let param: Partial<Param> = {};
      // now we use metaparams to know how to parse the parameters
      if (regexUnits) {
        const result = regexUnits.exec(fullName.trim());
        if (result?.groups?.units) {
          param.units = result.groups.units;
        }
      }
      if (mpsReadType === 'string') {
        param.value = paramValues.length === 1 ? paramValues[0] : paramValues;
      } else if (mpsReadType === 'float' || mpsReadType === 'float|string') {
        const result = paramValues.map((v) => {
          const n = parseFloat(v);
          return isNaN(n) ? v : n;
        });
        param.value = result.length === 1 ? result[0] : result;
      } else if (mpsReadType === 'int' || mpsReadType === 'int|string') {
        const result = paramValues.map((v) => {
          const n = parseInt(v, 10);
          return isNaN(n) ? v : n;
        });
        param.value = result.length === 1 ? result[0] : result;
      }
      params[paramName] = param as Param;
    }
    i++;
  }
  return [params, i - 1];
};
