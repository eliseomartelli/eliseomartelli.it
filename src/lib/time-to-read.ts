const WPM_READ = 200;

export const calculateTimeToRead = (content: string) => {
  const { round, max } = Math;
  return max(1, round(content.split(" ").length / WPM_READ));
};
