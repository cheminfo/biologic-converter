// distance from ole to epoc in milliseconds
export function oleToUTCDate(ole: number): Date {
  const oleToEpoch = new Date('12/30/1899 00:00:000Z').getTime();
  const oleToTarget = ole * 24 * 60 * 60 * 1000;
  // + because of sign change
  const resultInMs = oleToTarget + oleToEpoch;
  return new Date(resultInMs);
}
