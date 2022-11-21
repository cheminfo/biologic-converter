/**
 * Simplified camel casing function
 * just removes spaces and uppercase first letter when joining
 */
export function camelCase(str: string, splitAt = ' '): string {
  const arr = str.trim().toLowerCase().split(splitAt);
  let camelized = arr[0];
  if (arr.length > 1) {
    for (let i = 1; i < arr.length; i++) {
      const word = arr[i];
      camelized += word.charAt(0).toUpperCase() + word.slice(1);
    }
  }
  return camelized;
}
