import { GetServerSidePropsContext } from "next";

export const RESET = "\x1b[0m";
export const BOLD = "\x1b[1m";
export const ITALIC = "\x1b[3m";
export const UNDERLINE = "\x1b[4m";
export const CYAN = "\x1b[38;5;36m";
export const HIGHLIGHT = "\x1b[48;5;124m\x1b[38;5;15m";

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  res.setHeader("Content-Type", "text");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );

  const response = `
${BOLD + HIGHLIGHT} Eliseo Martelli ${RESET}

Freelance software developer from Italy.
Helping people build modern & compelling digital experiences.

${HIGHLIGHT + BOLD} Contact me ${RESET}

mail: me@eliseomartelli.it

${HIGHLIGHT + BOLD} Other pages ${RESET}

- https://eliseomartelli.it/curl/blog

`;

  res.write(response);
  res.end();

  return {
    props: {},
  };
}

export default function RSSFeed() {
  return null;
}
