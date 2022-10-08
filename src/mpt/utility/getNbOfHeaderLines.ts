/**
 * pass the line and tries to convert the value to integer or
 * errors out (when NaN).
 */
export function getNbOfHeaderLines(line: string): number {
  const nOfHeaderLines = line.split(' : ');
  let val = parseInt(nOfHeaderLines[1].trim(), 10);
  if (isNaN(val)) {
    throw new Error(
      'Can not find a numeric value for the number of lines. Aborting.',
    );
  } else {
    return val;
  }
}
