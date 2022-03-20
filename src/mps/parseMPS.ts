import { TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { LineReader } from '../utils';

export type StringObject = Record<string,string>;
export type Nested = Record<string,string|StringObject>;
export type ParseMPS = Record<string,string|Nested>;
/** For example, an object like:
 * ```
 * {
 *   p1:"first",
 *   p2:"second",
 *   Transform:{
 *     "1":{
 *        a:"b",
 *        c:"d"
 *        },
 *     "2":{
 *        a:"bb",
 *        x:"y"
 *        }
 *    },
 *   p3: "third",
 *   ...
 *  }
 * ```
 */

/**
 * Parses technique from the _.mps_ file
 * @param mpsRaw - LineReader (see [[`LineReader`]]) object so we can use readLine()
 * @return object with all the properties
 */
export function addTechnique(mpsRaw:LineReader): StringObject{
  const name = mpsRaw.readLine().trim();
  let temp:StringObject = {name:name};
  let it = true;
  while(it){ //2. we read the k-v pairs for this technique
    const kV = mpsRaw.readLine().split(/\s{2,}/);
    if(kV.length===1 && kV[0]==="") {
      it = false;
      break
    }
    const k = kV[0].trim();
    const v = kV[1].trim();
    temp[k]=v
  }
  return temp;
}

/**
 * Creates an mps object from an mps file
 * @param arrayBuffer - pass the file as string,buffer,arraybuffer..
 * @returns object representing the parsed data
 */
export function parseMPS(arrayBuffer: TextData):ParseMPS {

    const makeString = ensureString(arrayBuffer, { encoding: 'latin1' })
    let mpsRaw:LineReader = new LineReader(makeString);
    let result:ParseMPS = { };

    let currentKey = '';
    while(mpsRaw.index < mpsRaw.length){

      const currentLine = mpsRaw.readLine().trim();/* increases index by 1 */

      const findKV = / : | :$/
      if (findKV.exec(currentLine)) { /* key : value */
        const kV = currentLine.split(findKV);
        currentKey = kV[0].trim();
        const val = kV[1].trim();

        /* if key is Technique add it */
        if(currentKey==="Technique"){
          Object.assign(result,{[val]:addTechnique(mpsRaw)})
        }
        /* for keys other than technique*/
        else { result[currentKey] = val; }

      } else {/* no ':' in line, extends previous line */
        if (currentKey!=="" && currentLine!=='') {/* if empty we skip it */
          result[currentKey] += `\n${currentLine}`;
        }
      }
    }
    return result;
  }

