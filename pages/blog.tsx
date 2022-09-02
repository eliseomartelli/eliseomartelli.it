import Link from "next/link";
import Container from "../components/Container";
import { loadPosts } from "../lib/posts";

import { Post } from "../types/post";

interface BlogProps {
  posts: Post[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <Container customMeta={{ title: "Blog - Eliseo Martelli" }}>
      <h1>Blog</h1>
      <ul className="flex flex-col gap-10">
        {posts.map((post, i) => {
          return (
            <li key={i}>
              <Link href={`/blog/${post.slug}`} passHref>
                <a>
                  <h2 className="font-bold text-xl">
                    {post.frontmatter.title}
                  </h2>
                  <p>
                    {post.frontmatter.date} - ⏱ {post.timeToRead} minutes to
                    read
                  </p>
                  <p className="mt-2">{post.frontmatter.excerpt}</p>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export async function getStaticProps() {
  return {
    props: {
      posts: loadPosts(),
    },
  };
}

export default Blog;
