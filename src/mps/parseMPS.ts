import { TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { StringObject, DNested } from '../index';

export type MPS = DNested;
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
 * @param i - index to start reading
 * @param lines - lines to read
 * @return [new technique, new index] tuple
 */
export function parseTechnique(lines:string[], i:number): [StringObject, number]{
  const name = lines[i++].trim();//1. technique name
  let temp:StringObject = { name };

  while(i<lines.length){ //2. k-v pairs for this technique
    const kV = lines[i++].split(/\s{2,}/);
    if(kV.length===1 && kV[0]==="") {
      break
    }
    const k = kV[0].trim();
    const v = kV[1].trim();
    temp[k]=v
  }
  return [temp,i];
}

/**
 * Creates an mps object from an mps file
 * @param arrayBuffer - pass the file as string,buffer,arraybuffer..
 * @returns object representing the parsed data
 */
export function parseMPS(data: TextData|string[]):MPS {

    const lines: string[] = Array.isArray(data) ?  data : ensureString(data, { encoding: 'latin1' }).split(/\r?\n/);

    let result:MPS = { "Technique": { } };

    let currentKey = '';
    let i = 0;
    while(i < lines.length){

      const currentLine = lines[i++].trim();
      const kV = currentLine.split(/ : | :$/)

      if (kV.length===2) { /* key : value */
        currentKey = kV[0].trim();
        const val = kV[1].trim();

        /* if key is Technique add it */
        if(currentKey==="Technique"){
          const [newTechnique,newIndex]: [StringObject,number] = parseTechnique(lines,i)
          Object.assign(result[currentKey],{[val]:newTechnique})
          i = newIndex;
      } else {/* for keys other than technique*/
        result[currentKey] = val; 
        }

      } else {/* no ':' in line, extends previous line */
        if (currentKey!=="" && currentLine!=="") {/* if empty we skip it */
          result[currentKey] += `\n${currentLine}`;
        }
      }
    }
    return result;
  }

