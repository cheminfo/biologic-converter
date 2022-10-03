import { readFileSync } from 'fs';
import { join } from 'path';

import { parseMPR } from '../parseMPR';

const testFiles = '../../__tests__/data/test';

// test a few different keys from each file, 
describe('Compare the technique (settings parser)', () => {

  it('ca meta', () => {
    const trueMeta = JSON.parse(
      readFileSync(join(__dirname, `${testFiles}/ca-meta.json`), 'utf8')
     )

    const trueParams = trueMeta.params[0];
 
   // we organize the data a bit differently
    const { settings: { variables } } = parseMPR(readFileSync(join(__dirname, `${testFiles}/ca.mpr`)))
    const ourParams = variables.params;

   // First compara the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length)
    expect(ourParams["I_range"]).toBe(trueParams["I_range"])
    expect(ourParams.eTransferred).toBe(trueParams["e_transferred"])
    expect(ourParams.Ei).toBe(trueParams.Ei)

  // now compare settings keys
  expect(Object.keys(variables)).toHaveLength(Object.keys(trueMeta.settings).length+1)// we store params inside variables
  });

  it('cp meta', () => {

    const trueMeta = JSON.parse(readFileSync(join(__dirname, `${testFiles}/cp-meta.json`), 'utf8'))
    const trueParams = trueMeta.params[0]

   // we organize the data a bit differently
    const { settings: { variables } } = parseMPR(readFileSync(join(__dirname, `${testFiles}/cp.mpr`)))
    const ourParams = variables.params;

   // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length)

  // now compare settings keys
  expect(Object.keys(variables)).toHaveLength(Object.keys(trueMeta.settings).length+1)// we store params inside variables

  });

  it('cv params', () => {

    const trueMeta = JSON.parse(readFileSync(join(__dirname, `${testFiles}/cp-meta.json`), 'utf8'))
    const trueParams = trueMeta.params[0]

   // we organize the data a bit differently
    const { settings: { variables } } = parseMPR(readFileSync(join(__dirname, `${testFiles}/cp.mpr`)))
    const ourParams = variables.params;

   // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length)

})
  it('lsv params', () => {
    const trueMeta = JSON.parse(readFileSync(join(__dirname, `${testFiles}/lsv-meta.json`), 'utf8'))
    const trueParams = trueMeta.params[0]

   // we organize the data a bit differently
    const { settings: { variables } } = parseMPR(readFileSync(join(__dirname, `${testFiles}/lsv.mpr`)))
    const ourParams = variables.params;

   // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length)
});


  it('zirParams', () => {
    const trueMeta = JSON.parse(readFileSync(join(__dirname, `${testFiles}/zir-meta.json`), 'utf8'))
    const trueParams = trueMeta.params[0]

   // we organize the data a bit differently
    const { settings: { variables } } = parseMPR(readFileSync(join(__dirname, `${testFiles}/zir.mpr`)))
    const ourParams = variables.params;

   // First compare the params key
    expect(Object.keys(ourParams)).toHaveLength(Object.keys(trueParams).length)

})
/**
it('wait params', () => {//the python script fails w this file. 
  const waitParams = JSON.parse(readFileSync(join(__dirname, `${testFiles}/WAITmeta.json`), 'utf8')).params[0]
  console.log(waitParams);
  delete waitParams.technique//idk where the file came from, but "technique" is stored outside params
  nanToNaN(waitParams)
  const parsed = parseMPR(readFileSync(join(__dirname, `${testFiles}/wait.mpr`)))
  const params = parsed.settings.variables.params 
  expect(params).toMatchObject(waitParams)
});
*/
})

