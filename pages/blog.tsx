import Link from "next/link";
import Container from "../components/Container";
import { loadPosts } from "../lib/posts";

export async function getStaticProps() {
  return {
    props: {
      posts: loadPosts(),
    },
  };
}

interface BlogProps {
  posts: any;
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <Container>
      <h2 className="text-2xl font-bold">Blog</h2>
      <ul className="flex flex-col gap-10">
        {posts.map(
          (
            post: {
              date: string;
              frontmatter: { title: string };
              slug: string;
              timeToRead: number;
            },
            i: number
          ) => {
            return (
              <li key={i}>
                <Link href={`/blog/${post.slug}`} passHref>
                  <a>
                    <h3 className="font-bold text-xl">
                      {post.frontmatter.title}
                    </h3>
                    <p></p>
                    <p className="mt-4">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      - ⏱ {post.timeToRead} minutes to read
                    </p>
                  </a>
                </Link>
              </li>
            );
          }
        )}
        <li></li>
      </ul>
    </Container>
  );
};

export default Blog;
