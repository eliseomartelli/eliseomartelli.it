export const minutesToHHMMSS = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.round((totalMinutes * 60) % 60);

  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");

  if (hours === 0) {
    return `${mm}:${ss}`;
  }

  return `${hh}:${mm}:${ss}`;
};
