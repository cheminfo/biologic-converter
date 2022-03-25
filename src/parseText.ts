import {TextData} from "cheminfo-types";
import {ensureString} from "ensure-string";

import { StringObject, ComplexObject } from "./Types";

/**
 * This interface is a special key name as a string,
 * and the value of the key is the function used to parse
 * that key. So for example the `{"technique":myFn}`
 * But the function needs a special syntax, see [[`SpecialKeyFn`]].
 */
export interface ParseSpecialKey{ [specialKeyName:string]: SpecialKeyFn }

/**
 * Syntax for the special key
 */
export type SpecialKeyFn = (lines:string[], index:number) => [newObject:StringObject, newIndex:number]

/**
 * Type for [[`parseText`]] Function
 */
export type ParseText = ( data: TextData|string[], specialKey?:ParseSpecialKey) => ComplexObject
/**
 * Used in MPS or MPT Header (only) parser,
 * @param data - File or string or string array to be parsed,
 * @param specialKey - Optional for parsing a specific key differently
 * see [[`ParseSpecialKey`]]
 * @returns parsed data as a JSON Object.
 */
export const parseText:ParseText = ( data, specialKey) => {

  const lines: string[] = Array.isArray(data) ? data : ensureString(data, { encoding: 'latin1' }).split(/\r?\n/);

  /* main object */
  let result:ComplexObject = { };

  /* regexes may need improvement */
  const nothing = /^$/;
  const keyValue = / : | :$/;
  const table = /^\w.*\s{2,}-*\w+.*\s{4,}$/;
  const multiline = /^ |^\t/;


  let i = 0; //loop over lines

  for(;i < lines.length;i++){// read line by line...

      const currentLine = lines[i];

      /* empty line, continue */
      if(nothing.test(lines[i])) { }

      /* key val pairs. Value is single or multiline */
      else if(keyValue.test(lines[i])){
      /* variables */
      let kV:string[] = lines[i].split(keyValue);
      let key:string = kV[0].trim();
      let val:string|boolean="";

      /* length is normally 2, it may be larger */
      if(kV.length>2) {
        val = kV.slice(1).join(' : ').trim();
      } else { val = kV[1].trim() }

      /* when it does split it may be multiline */
      /* Special key parsing */
      if(specialKey && (key in specialKey) && val){
        const [newObject, newIndex] = specialKey[key](lines,++i) as [StringObject,number]
          (key in result) ?
          Object.assign(result[key], { [val] : newObject }) :
          Object.assign(result, { [key]: { [val] : newObject }})
          i = newIndex;
        continue;//next line
      }

      /* if not special key, and multiline */
      while(multiline.test(lines[i+1])){ i++; val+=lines[i]; }

      //either multiline or not, assign now
      result[key]=val;
    }

    /* for not k : v */
    else if(table.test(currentLine)){//table
    const kV:string[] = currentLine.split(/\s{2,}/)
    const key:string = kV[0].trim();
    const val:string|boolean = kV[1].trim();
    result[key]=val;
  } else{//boolean
    ("flags" in result) && (Array.isArray(result.flags)) ?
    result.flags.push(currentLine):
    result.flags = [currentLine];
  }
}

  return result;
}
