export interface GroupedFiles {
  id: string;
  name: string;
  extension: string;
  mpr?: File;
  mps?: File;
  mpt?: File;
  [key: string]: any;
}

/**
 * Group the files if they differ only by extension.
 * The files must be in the same directory.
 * @param fileList
 * @return - array that may contain `{mpr, mps and mpt}` as File
 */

export function groupFileList(fileList: File[]): GroupedFiles[] {
  const results: { [key: string]: any } = {};
  for (const file of fileList) {
    const extension = file.name.replace(/.*\./, '');
    const id = file.webkitRelativePath.replace(/\.[^.]+$/, '');
    if (!results[id]) {
      results[id] = {
        id,
        name: file.name,
      };
    }
    results[id][extension]=file
  }
  return Object.keys(results).map((key) => results[key]);
}

