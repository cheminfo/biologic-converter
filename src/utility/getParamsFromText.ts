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
  lines: string[],
  i: number,
) => [OutParams, number];

/**
 * Parses technique from text file
 * @param lines - lines to read
 * @param i - index to start reading
 * @return `[params, newIndex]`, `boolean` indicates whether is a known technique
 */
export const getParams: GetTechniqueParameters = function getParams(lines, i) {
  let params: OutParams = {};
  do {
    const paramLine = lines[i].trim();
    const [longParameterName, ...paramValues] = paramLine.split(/\s{2,}/);
    //mutates object
    addCleanParam(params, longParameterName, paramValues);
    i++;
  } while (/\s{3,}$/.test(lines[i + 1]));
  return [params, i];
};
/**
 *
 * @param longParameterName
 * @param paramValues
 * @returns
 */
function addCleanParam(
  params: OutParams,
  longParameterName: string,
  paramValues: string[],
): void {
  const nameUnits = /(?<pName>.*) \((?<units>.*)\)/;
  const result = nameUnits.exec(longParameterName.trim());
  const name: string = result?.groups?.pName || longParameterName;
  const units: string | undefined = result?.groups?.units;

  params[name] = {
    value: paramValues.length === 1 ? paramValues[0] : paramValues,
  };

  if (units) {
    params[name].units = units;
  }
}
