import Link from "next/link";
import Container from "../components/Container";
import { Taglet } from "../components/Taglet";
import { loadPosts } from "../lib/posts";

import { Post } from "../types/post";

interface BlogProps {
  posts: Post[];
}

const Blog = ({ posts }: BlogProps) => {
  return (
    <Container customMeta={{ title: "Blog - Eliseo Martelli" }}>
      <h1>Blog</h1>
      <ul>
        {posts.map((post, i) => {
          return (
            <li
              key={i}
              className="hover:bg-gray-200 -m-4 mb-6 rounded-md transition-colors"
            >
              <Link href={`/blog/${post.slug}`}>
                <a className="py-4 px-4 flex gap-2 flex-col">
                  <h2 className="font-bold text-xl">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-gray-500">
                    {post.frontmatter.date} - ⏱ {post.timeToRead} minutes to
                    read
                  </p>
                  <p className="mt-2">{post.frontmatter.excerpt}</p>
                  <div className="flex gap-2">
                    {post.frontmatter.tags?.map((e, i) => (
                      <Taglet tag={e} key={i} />
                    ))}
                  </div>
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
