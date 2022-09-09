import { GetServerSidePropsContext } from "next";
import { BOLD, RESET } from "../../lib/cli/colors";
import { page } from "../../lib/cli/page";

export async function getServerSideProps({
  res,
  req,
}: GetServerSidePropsContext) {
  if (!req.headers["user-agent"]?.includes("curl")) {
    res.writeHead(301, { Location: "/about" });
  }
  res.setHeader("Content-Type", "text");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );

  const content = `
Freelance software developer from Italy.
Helping people build modern & compelling digital experiences.

${BOLD}Contact me${RESET}

mail: me@eliseomartelli.it

${BOLD}Other pages${RESET}

 - https://eliseomartelli.it/curl/blog
 - https://eliseomartelli.it/curl/resume

${BOLD}PGP KEY${RESET}: https://eliseomartelli.it/pubkey.pgp
`;

  res.write(page(content));
  res.end();
  return { props: {} };
}

export default function _() {
  return null;
}
