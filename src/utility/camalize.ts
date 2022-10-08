/**
 * Make key of object camelcase, it is not fast or general,
 * just removes spaces and uppercases first letter when joining
 */
export function camalize(str: string): string {
  const arr = str.trim().toLowerCase().split(' ');
  let camelized = arr[0];
  if (arr.length > 1) {
    for (let i = 1; i < arr.length; i++) {
      const word = arr[i];
      camelized += word.charAt(0).toUpperCase() + word.slice(1);
    }
  }
  return camelized;
}
