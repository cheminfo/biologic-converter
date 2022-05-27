/** string object `{a:'string..',..}` */
export type StringObject = Record<string, string | boolean>;
export interface ComplexObject {
  //eslint-disable-next-line
  [key: string]: any;
}
