//import { TextData, MeasurementVariable } from 'cheminfo-types';
//import { ensureString } from 'ensure-string';

import { MPR, parseMPR } from "./mpr/parseMPR";
import { MPS, parseMPS } from "./mps/parseMPS";
import { MPT, parseMPT } from "./mpt/parseMPT";
import { groupFiles } from "./utils";

import { PartialFileList } from "./index";

/** Results of an experiment carried out by BioLogic */
export interface BioLogic {
  /** parsed settings file */
  mps?: MPS,
  /** parsed whole file */
  mpt?: MPT,
  /** parsed binary file */
  mpr?: MPR
  }

/**
 *  Receives an array of File, organizes by dir, and by extension,
 *  and gets the properties from each file
 * @param fileList - array of files
 * We will take care of grouping the measurements so we may process an unlimited number of them
 * @returns All array of objects, each object is an experiment with parsed results.
 */
export async function convertBioLogic(fileList: PartialFileList|FileList): Promise<BioLogic[]> {

  const gFLOptions = { idWithBasename:true, useExtension:true }
  const groups = groupFiles(fileList, gFLOptions);/* items in the same directory in an object */

  let measurements: BioLogic[ ] = [ ];

  for ( const exp of groups) {

    let result: BioLogic = { }

    if(exp.mps) {
      result['mps'] = parseMPS(await exp.mps.arrayBuffer())
    }
    if(exp.mpt){
    result['mpt'] = parseMPT(await exp.mpt.arrayBuffer())
    }
    if(exp.mpr){
    result['mpr'] = parseMPR(await exp.mpr.arrayBuffer())
    }
    measurements.push(exp);

  }
  return measurements;
}
