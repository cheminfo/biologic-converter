export * from "./convert";
export * from "./utils";
export * from "./mps/parseMPS";

/** string object `{a:'string..',..}` */
export type StringObject = Record<string,string>;
/** nested object */
export type Nested = Record<string,string|StringObject>;
/** double nested object */
export type DNested = Record<string,string|Nested>;

/** temporary type untill filelist-from is more stable */
export type PartialFile = Omit<File, 'stream' | 'slice' | 'type'>;
export type PartialFileList = PartialFile[]; 
