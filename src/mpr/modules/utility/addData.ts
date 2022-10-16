import { MeasurementVariable } from 'cheminfo-types';

export function addData(
  varsChild: MeasurementVariable,
  value: number,
): MeasurementVariable {
  // emulate prev code behaviour
  value = Number(value);
  if (Array.isArray(varsChild.data)) {
    varsChild.data.push(value);
  } else {
    varsChild.data = [value];
  }
  return varsChild;
}
