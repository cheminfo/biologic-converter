import { VarsChild } from '../parseData';

export function addData(
  varsChild: Partial<VarsChild>,
  value: string | number | undefined,
): Partial<VarsChild> {
  // emulate prev code behaviour
  if (value === undefined) return varsChild;

  if (Array.isArray(varsChild.data)) {
    varsChild.data.push(value);
  } else {
    varsChild.data = [value];
  }
  return varsChild;
}
