import { VarsChild } from '../parseData';

export function addData(varsChild: VarsChild, value: number): VarsChild {
  // emulate prev code behaviour
  value = Number(value);
  if (Array.isArray(varsChild.data)) {
    varsChild.data.push(value);
  } else {
    varsChild.data = [value];
  }
  return varsChild;
}
