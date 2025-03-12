export function pluralize(number: number, strings: string[]): string {
  if (strings.length !== 2) {
    throw Error("Strings should contain exactly two elements.");
  }
  return (number == 1 ? strings[0] : strings[1]).replace(
    "%d",
    number.toString(),
  );
}
