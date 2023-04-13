const WPM_READ = 200;

export const timeToRead = (content: string) => {
  const { round, max } = Math;
  return max(1, round(content.split(" ").length / WPM_READ)).toString();
};
