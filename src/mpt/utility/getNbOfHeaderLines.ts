/**
 * pass the line and tries to convert the value to integer or
 * errors out (when NaN).
 */
export function getNbOfHeaderLines(headerLine: string): number {
  if (!headerLine.startsWith('Nb header lines')) {
    throw new Error('Missing header line.');
  }
  const val = parseInt(headerLine.split(' : ')[1].trim(), 10);
  if (isNaN(val)) {
    throw new Error(
      'Can not find a numeric value for the number of lines. Aborting.',
    );
  }
  return val;
}
