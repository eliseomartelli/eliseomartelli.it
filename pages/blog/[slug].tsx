import fs from "fs";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { useContext } from "react";
import Container from "../../components/Container";
import { Newsletter } from "../../components/Newsletter";
import { loadPostSlugs } from "../../lib/posts";
import { ModalContext } from "../../providers/Modal";
import { mdxToHTML } from "../../lib/mdx";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

interface BlogPostProps {
  content: MDXRemoteSerializeResult;
}

export default function BlogPost({ content }: BlogPostProps): JSX.Element {
  const modal = useContext(ModalContext);
  return (
    <Container
      customMeta={{ title: `${content.frontmatter?.title} - Eliseo Martelli` }}
    >
      <h1 className="text-3xl font-bold">{content.frontmatter?.title}</h1>
      <article className="prose mx-auto max-w-full">
        <MDXRemote {...content} components={{ Newsletter }} />
      </article>
      <a
        className="mt-4 bg-gray-500 hover:bg-gray-800 text-white font-bold px-4 py-2 rounded-md self-end cursor-pointer"
        onClick={() => {
          modal.showModal(<Newsletter modal />);
        }}
      >
        Subscribe to the newsletter
      </a>
    </Container>
  );
}

export async function getStaticPaths() {
  const slugs = loadPostSlugs();
  const paths = slugs.map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ props: BlogPostProps }> {
  const { slug } = context.params as IParams;
  const file = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  const { html } = await mdxToHTML(file);
  return {
    props: {
      content: html,
    },
  };
}
