import { GetServerSidePropsContext } from "next";
import { BOLD, CYAN, HIGHLIGHT, ITALIC, RESET, UNDERLINE } from ".";
import { loadPosts } from "../../lib/posts";

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
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

  const response = `
Eliseo Martelli ${RESET}${HIGHLIGHT} Blog ${RESET}

${posts}

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
