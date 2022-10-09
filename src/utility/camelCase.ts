/**
 * Make key of object camel-case, it is not fast or general,
 * just removes spaces and uppercase first letter when joining
 */
export function camelCase(str: string): string {
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
