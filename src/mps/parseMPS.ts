import { TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';

import { Lined } from '../utils';

export type StringObject = Record<string,string>;

/**
 * Creates an mps object from an mps file
 * @param arrayBuffer - pass the file as string,buffer,arraybuffer..
 * @returns object representing the parsed data
 */
export class ParseMPS{

  /* needs a proper definition */
  [key:string]: any;

  public constructor(arrayBuffer: TextData) {

    const makeString = ensureString(arrayBuffer, { encoding: 'latin1' })

    let mpsRaw:Lined = new Lined(makeString);

    let currentKey = '';
    while(mpsRaw.index < mpsRaw.length){

      const currentLine = mpsRaw.readLine();/* increases index by 1 */

      if (currentLine.match(' : ')) { /* key : value */
        const kV = currentLine.split(' : '); 
        currentKey = kV[0].trim(); 
        const val = kV[1].trim();

        /* if key is Technique read the k-v */
        if(currentKey==="Technique"){/*1. take technique name */
          const techniqueName = mpsRaw.readLine().trim();
          /* if not there set it */
          if(!this[currentKey]) this[currentKey] = { };
          /* if there, add an "object key" w props */
          this[currentKey][val] = {...this.addTechnique(techniqueName,mpsRaw)};
        } 
        /* for keys other than technique*/
        else { this[currentKey] = val; }

      } else {/* no ':' in line, extends previous line */
        if (currentKey!=="") {/* if empty we skip it */
          this[currentKey] += `\n${currentLine}`;
        }
      }
    }
  }

  private addTechnique(name:string,mpsRaw:Lined):StringObject{
    let temp:StringObject= {name:name};
    let it = true;
    while(it){ //2. we read the k-v pairs for this technique
      const kV = mpsRaw.readLine().split(/\s{2,}/);
      console.log(kV);
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
}

