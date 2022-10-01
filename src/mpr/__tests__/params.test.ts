import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPR } from '../parseMPR';

const testFiles = '../../__tests__/data/test';


function nanToNaN(objects:Record<string,string|string|number>[]){

objects.forEach((param:Record<string,string|number>, i:number) => {
  for (let [key,val] of Object.entries(param)){
   if(val==="nan") {
    objects[i][key] = NaN
}}})

}

describe('Compare the technique (settings parser)', () => {

  it('ca params', () => {
    const caParams = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/ca-params.json`), 'utf8')
    );
      // convert to NaN what they put as "nan"
    nanToNaN(caParams);
    const parsed = parseMPR(readFileSync(join(__dirname, `${testFiles}/ca.mpr`)))
    const params = parsed.settings.variables.params
    expect(caParams[0]).toMatchObject(params)
  });

  it('cp params', () => {

    const cpParams = JSON.parse(readFileSync(join(__dirname, `${testFiles}/cp-params.json`), 'utf8'));
    nanToNaN(cpParams)
    const parsed = parseMPR(readFileSync(join(__dirname, `${testFiles}/cp.mpr`)))
    const params = parsed.settings.variables.params 
    expect(cpParams[0]).toMatchObject(params)
  });

  it('cv params', () => {
    const cvParams = JSON.parse(readFileSync(join(__dirname, `${testFiles}/cv-params.json`), 'utf8'));
    nanToNaN(cvParams)
    const parsed = parseMPR(readFileSync(join(__dirname, `${testFiles}/cv.mpr`)))
    const params = parsed.settings.variables.params 
    expect(cvParams[0]).toMatchObject(params)
})
  it('lsv params', () => {
    const lsvParams = JSON.parse(readFileSync(join(__dirname, `${testFiles}/lsv-params.json`), 'utf8'));
    nanToNaN(lsvParams)
    const parsed = parseMPR(readFileSync(join(__dirname, `${testFiles}/lsv.mpr`)))
    const params = parsed.settings.variables.params 
    expect(lsvParams[0]).toMatchObject(params)
  });
  it('wait params', () => {//the python script fails w this file. 
    const json = JSON.parse(readFileSync(join(__dirname, `${testFiles}/WAITmeta.json`), 'utf8'))
    const WAITparams = json.params
    nanToNaN(WAITparams)
    const parsed = parseMPR(readFileSync(join(__dirname, `${testFiles}/wait.mpr`)))
    const params = parsed.settings.variables.params 
    expect(WAITparams[0]).toMatchObject(params)
  });

  it('zirParams', () => {

    const zirParams = JSON.parse(readFileSync(join(__dirname, `${testFiles}/zir-params.json`), 'utf8'));
    nanToNaN(zirParams)
    const parsed = parseMPR(readFileSync(join(__dirname, `${testFiles}/zir.mpr`)))
    const params = parsed.settings.variables.params 
    expect(zirParams[0]).toMatchObject(params)
})
})
