import fs from "fs";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Container from "../../components/Container";
import { Newsletter } from "../../components/Newsletter";
import { loadPostSlugs } from "../../lib/posts";
import { useModal } from "../../providers/Modal";
import { mdxToHTML } from "../../lib/mdx";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import Button, { Color } from "../../components/Button";
import path from "path";
import { useRouter } from "next/router";
import HighlightBox from "../../components/HighlightBox";
import { Taglet } from "../../components/Taglet";

interface BlogPostProps {
  content: MDXRemoteSerializeResult;
}

const components = { HighlightBox };

export default function BlogPost({ content }: BlogPostProps): JSX.Element {
  const { showModal } = useModal();
  const { asPath } = useRouter();
  return (
    <Container
      customMeta={{
        title: `${content.frontmatter?.title} - Eliseo Martelli`,
        description: content.frontmatter?.excerpt,
        image: content.frontmatter?.previewImgUrl,
        date: content.frontmatter?.date,
      }}
    >
      <div>
        <p className="hidden print:block text-xs">
          From Eliseo Martelli - https://eliseomartelli.it
        </p>
        <p className="mb-2">{content.frontmatter?.date}</p>
        <h1 className="text-3xl font-bold">{content.frontmatter?.title}</h1>
        <div className="flex gap-2 mt-2">
          {(content.frontmatter!.tags as unknown as string[]).map((e, i) => (
            <Taglet key={i} tag={e} />
          ))}
        </div>
      </div>
      <article className="prose mx-auto w-full max-w-full prose-img:mx-auto">
        <MDXRemote {...content} components={components} lazy />
      </article>
      <div className="flex gap-2 flex-col print:hidden items-center">
        <div className="flex gap-2 justify-center items-center">
          <p className="font-bold">Discuss on:</p>
          <a href={`https://mastodon.social/@eliseomartelli`}>
            <Button className="self-end" color={Color.Purple}>
              Mastodon
            </Button>
          </a>
          <a
            href={`https://twitter.com/search?q=${
              "https://eliseomartelli.it" + asPath
            }&f=live`}
          >
            <Button className="self-end" color={Color.Sky}>
              Twitter
            </Button>
          </a>
        </div>
        <Button
          color={Color.DarkGray}
          onClick={() => {
            showModal(<Newsletter modal />);
          }}
        >
          Subscribe to the newsletter
        </Button>
      </div>
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
  let { slug } = context.params as IParams;
  slug += ".md";
  const filePath = path.join("posts", slug);
  const file = fs.readFileSync(filePath, "utf-8");
  const { html } = await mdxToHTML(file);
  return {
    props: {
      content: html,
    },
  };
}
