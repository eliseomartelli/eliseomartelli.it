import { GetStaticPropsContext } from "next";
import Link from "next/link";
import React from "react";
import Container from "../../../components/Container";
import { Taglet } from "../../../components/Taglet";
import { loadPosts } from "../../../lib/posts";
import { Post } from "../../../types/post";

export default function CategoryPage({
  category,
  posts,
}: {
  category: string;
  posts: Post[];
}): JSX.Element {
  return (
    <Container customMeta={{ title: "Blog - Eliseo Martelli" }}>
      <Link href="/blog" legacyBehavior>
        <h1 className="cursor-pointer">← Blog - {category}</h1>
      </Link>
      <ul>
        {posts.map((post, i) => {
          return (
            <li
              key={i}
              className="hover:bg-gray-200 -m-4 mb-6 rounded-md transition-colors"
            >
              <Link href={`/blog/${post.slug}`} className="py-4 px-4 flex gap-2 flex-col">

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

              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
export async function getStaticProps(context: GetStaticPropsContext) {
  let { category } = context.params as { category: string };
  const posts = loadPosts().filter(
    (post) => post.frontmatter.tags!.indexOf(category) != -1
  );
  return {
    props: {
      category,
      posts,
    },
  };
}

export async function getStaticPaths() {
  const posts = loadPosts();
  const tags = [...posts.map((p) => p.frontmatter!.tags!)].flat();
  const paths = tags
    .filter((x, i, a) => a.indexOf(x) == i)
    .map((e) => {
      return { params: { category: e } };
    });

  return {
    paths,
    fallback: "blocking",
  };
}
