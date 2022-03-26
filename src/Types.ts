/** string object `{a:'string..',..}` */
export type StringObject = Record<string, string | boolean>;
export interface ComplexObject {
  [key: string]: any;
}

/**
 * temporary type untill filelist-from is more stable
 */
export type PartialFile = Omit<File, 'stream' | 'slice' | 'type'>;
export type PartialFileList = PartialFile[];
