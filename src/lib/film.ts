export function calculateFilmTime(
  baseTimeSeconds: number,
  baseTemp: number,
  measuredTemp: number,
  pushPull: number,
  constantAgitation: boolean = false,
): number {
  const tempDiff = baseTemp - measuredTemp;
  const tempFactor = Math.pow(1.1, tempDiff);
  const pushPullFactor = Math.pow(1.5, pushPull);
  const agitationFactor = constantAgitation ? 0.9 : 1.0;

  return baseTimeSeconds * tempFactor * pushPullFactor * agitationFactor;
}
