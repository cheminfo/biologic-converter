/** How EC-Lab writes a duration: hours, minutes, then seconds with a fraction. */
const DURATION = /^(?<hours>\d+):(?<minutes>\d+):(?<seconds>\d+(?:\.\d+)?)$/;

/**
 * Read a duration EC-Lab writes as `h:m:s`.
 *
 * Reading it as a plain number keeps only the hours, so a five-second rest
 * written `0:00:5.0000` comes back as zero — and a thirty-minute hold written
 * `0:30:0.0000` comes back as zero too, which is the same value a technique
 * that was never run would have.
 * @param value - the field as written
 * @returns the duration in seconds, or `null` when the field is not one
 */
export function durationToSeconds(value: string): number | null {
  const groups = DURATION.exec(value.trim())?.groups;
  if (!groups) return null;
  return (
    Number(groups.hours) * 3600 +
    Number(groups.minutes) * 60 +
    Number(groups.seconds)
  );
}
