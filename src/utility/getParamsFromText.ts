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
  // TODO: if first param is Ns (number of steps) then add it to metaParams or something.
  for (i; i < metaParams.length; i++) {
    const thisLine = lines[i].trim();
    if (thisLine === '') break;

    const { name: paramName, regexUnits, mpsReadType } = metaParams[i];

    let [fullName, ...paramValues] = thisLine.split(/\s{2,}/); //leave technique name out

    if (!paramValues) {
      throw new Error('expected at least 2 values.');
    } else {
      //we have the parameters
      let param: Partial<Param> = {};
      // now we use metaparams to know how to parse the parameters
      if (regexUnits) {
        const result = regexUnits.exec(fullName);
        if (result?.groups?.units) {
          param.units = result.groups.units;
        }
      }
      if (mpsReadType === 'string') {
        param.value = paramValues;
      } else if (mpsReadType === 'float' || mpsReadType === 'float|string') {
        param.value = paramValues.map((v) => {
          const n = parseFloat(v);
          return isNaN(n) ? v : n;
        });
      } else if (mpsReadType === 'int' || mpsReadType === 'int|string') {
        param.value = paramValues.map((v) => {
          const n = parseInt(v, 10);
          return isNaN(n) ? v : n;
        });
      }
      params[paramName] = param as Param;
    }
  }
  return [params, i - 1];
};
