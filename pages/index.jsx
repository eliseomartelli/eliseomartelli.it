import { Article } from "../components/Article/Article";
import path from "path";
import { promises as fs } from "fs";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkFrontmatter from "remark-frontmatter";

export default function Home({ posts }) {
  return (
    <div>
      <ul className="space-y-8">
        {posts.map((e, i) => {
          return (
            <li>
              <Article
                hero={i === 0}
                timeToRead="5 minutes"
                date="12 Feb, 2021"
                title={e.title}
                excerpt={e.content.substring(200, 400)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "_posts");
  const filenames = await fs.readdir(postsDirectory);

  const posts = filenames.map(async (filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = await fs.readFile(filePath, "utf8");

    const processed = unified()
      .use(remarkParse)
      .use(remarkHtml)
      .use(remarkFrontmatter)
      .processSync(fileContents);
    return { content: processed.toString() };
  });
  return {
    props: { posts: await Promise.all(posts) }, // will be passed to the page component as props
  };
}
