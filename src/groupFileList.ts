/**
 * We need to group the files if they differ only by extension.
 * We should return an array that may contain {mpr, mps and mpt} as File
 * @param fileList
 * @returns
 */

export function groupFileList(fileList: File[]): object[] {
  const results: any = {};
  for (const file of fileList) {
    const name = file.name.replace(/^.*\//, '');
    const extension = file.name.replace(/^.*\./, '');
    const id = `${file.webkitRelativePath}/${file.name}`.replace(/\..*?$/, '');
    if (!results[id]) {
      results[id] = { id, name, extension };
    }
    results[id][extension] = file;
  }
  return Object.keys(results).map((key) => results[key]);
}
