import { PartialFileList } from './Types';

/**
 * Interface for [[`groupFiles`]]
 */
export interface GroupedFiles {
  /** group id used to group the files under same path */
  gid: string;
  /** file name as taken from [[`File`]] or compatible class.*/
  name: string;
  /** file extension if it has an extension */
  extension?: string;
  /** there is no other way atm, this will store the files */
  // eslint-disable-next-line
  [file: string]: any;
}

/**
 * Options for [[`groupFiles`]]
 * If neither `useBasename` nor `useExtension` are set it uses the Filename.
 */
export interface GroupFilesOptions {
  /** A path like `./dir1/dir2/base.ext` will use `./dir1/dir2/base` as id.
   */
  idWithBasename?: boolean;
  /** The `./dir1/dir2/base.ext` will be stored under `base` key */
  useBasename?: boolean;
  /** The `./dir1/dir2/base.ext` will be stored under `ext` key.
   * If no extension is found in file, it will use the basename. */
  useExtension?: boolean;
  /**use basename and extension for the name.*/
  useFilename?: boolean;
  /** both extension and  basename are lowercased, it doesnt touch the `id` field. */
  lowerCaseFileKey?: boolean;
}

/**
 * Group files under same directory path
 * i.e `[Dir1, Dir2, Dir3...]`  where each Dir object ooks like this
 * ```
 * {
 *   id,
 *   extension,
 *   name,
 *   fileA,
 *   fileB,...
 *  }
 *  ```
 * See `[[GroupFilesOptions]]` for all options.
 * Files _must be_ in the same directory to be grouped.
 * @param fileList
 * @return - array that _may_ contain `{mpr, mps and mpt}` as [[`File`]] Objects.
 */
export function groupFiles(
  fileList: PartialFileList | FileList,
  options: GroupFilesOptions = {
    idWithBasename: true,
    useExtension: true,
  },
): GroupedFiles[] {
  let { idWithBasename, useExtension, useBasename, lowerCaseFileKey } = options;

  let results: Record<string, Partial<GroupedFiles>> = {};

  for (const file of fileList) {
    /* set up name variables */
    let filename = file.name;
    if (lowerCaseFileKey) filename = filename.toLowerCase();
    const basename = filename.replace(/\.[^.]+$/, '');
    const extension = filename.replace(/.*\./, '');
    let gid;

    /* set the unique grouping id */
    if (idWithBasename) {
      gid = file.webkitRelativePath.replace(/\.[^/]+$/, '');
    } else {
      //just dir path, like for WDF parser.
      gid = file.webkitRelativePath.replace(/\.[^.]+$/, '');
    }

    /* create the partial group object inside results */
    if (!results[gid]) {
      Object.assign(results, { [gid]: { gid } });
    }

    /* place file under a particular group `results[gid]` */
    if (useExtension) {
      //if no extension, extension = basename anyways
      Object.assign(results[gid], { [extension]: file });
    } else if (useBasename) {
      //by basename
      Object.assign(results[gid], { [basename]: file });
    } else {
      // by fullname
      Object.assign(results[gid], { [filename]: file });
    }
  }
  return Object.keys(results).map((gid) => results[gid]) as GroupedFiles[];
}
