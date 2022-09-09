import { GetServerSidePropsContext } from "next";
import { BOLD, CYAN, ITALIC, RESET, UNDERLINE } from "../../lib/cli/colors";
import { page } from "../../lib/cli/page";
import { loadPosts } from "../../lib/posts";

export async function getServerSideProps({
  res,
  req,
}: GetServerSidePropsContext) {
  if (!req.headers["user-agent"]?.includes("curl")) {
    res.writeHead(301, { Location: "/blog" });
    return;
  }
  res.setHeader("Content-Type", "text");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );

  const posts = loadPosts()
    .map((post) => {
      return `
 - ${ITALIC}${post.frontmatter.date}${RESET}
   ${BOLD}${post.frontmatter.title}${RESET}
   ${ITALIC + UNDERLINE + CYAN}${
        "https://eliseomartelli.it/blog/" + post.slug
      }${RESET}
`;
    })
    .reduce((prev, curr) => prev + curr);

  res.write(page(posts, "Blog"));
  res.end();

  return { props: {} };
}

export default function _() {
  return null;
}
