/**
 * @param i - Natural number. Index of the letter (interpreted as negative offset from `z`)
 * @returns a letter from z to a, or Z to A if those are exhausted.
 */
export function getOneLetter(i: number): string {
  if (!Number.isInteger(i) || i < 0) {
    throw new Error(`Expected positive number. Received ${i}`);
  }
  const zCharCode = 122;
  const ZCharCode = 90;
  if (i < 26) {
    return String.fromCharCode(zCharCode - i);
  } else if (i < 52) {
    return String.fromCharCode(ZCharCode - (i % 26));
  } else {
    throw new Error(`Expect i to be integer less than 52. Received ${i}`);
  }
}
