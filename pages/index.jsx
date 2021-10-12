import { Article } from "../components/Article";
import path from "path";
import { promises as fs } from "fs";

export default function Home({ posts }) {
  return (
    <div>
      <ul className="space-y-8">
        {posts.map((e) => {
          return (
            <li>
              <Article
                hero
                timeToRead="5 minutes"
                date="12 Feb, 2021"
                title={e.filename}
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
    return { filename, content: fileContents };
  });
  return {
    props: { posts: await Promise.all(posts) }, // will be passed to the page component as props
  };
}
