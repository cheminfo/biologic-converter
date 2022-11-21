/**
 * @param i - numeric code for the ascii letter
 * @returns a letter from a to z, or A to Z if those are exhausted.
 */
export function getOneLetter(i: number): string {
  if (i < 0) {
    throw new Error('expected a positive number');
  } else if (i < 26) {
    return String.fromCharCode(97 + i);
  } else if (i < 52) {
    return String.fromCharCode(65 + (i % 26));
  } else {
    throw new Error('expected a number less than 52');
  }
}
