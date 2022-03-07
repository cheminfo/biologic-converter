/**
 * We need to group the files if they differ only by extension.
 * We should return an array that may contain {mpr, mps and mpt} as File
 * @param fileList
 * @returns
 */

interface GroupedFiles {
  id: string;
  name: string;
  extension: string;
  mpr?: File;
  mps?: File;
  mpt?: File;
  [key: string]: any;
}

export function groupFileList(fileList: File[]): GroupedFiles[] {
  const results: { [key: string]: any } = {};
  for (const file of fileList) {
    const extension = file.name.replace(/^.*\./, '');
    const id = `${file.webkitRelativePath}/${file.name}`.replace(/\..*?$/, '');
    if (!results[id]) {
      results[id] = {
        id,
        name: file.name,
        extension,
      };
    }
    results[id][extension] = file;
  }
  return Object.keys(results).map((key) => results[key]);
}
