import fs from "fs";
import matter from "gray-matter";
import { useContext } from "react";
import Container from "../../components/Container";
import { Newsletter } from "../../components/Newsletter";
import markdownToHTML from "../../lib/markdownToHTML";
import { loadPostSlugs } from "../../lib/posts";
import { ModalContext } from "../../providers/Modal";

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<{ props: { frontmatter: any; content: any } }> {
  const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content: await markdownToHTML(content),
    },
  };
}

export async function getStaticPaths() {
  const files = loadPostSlugs();
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
export default function BlogPost({ frontmatter, content }): JSX.Element {
  const modal = useContext(ModalContext);
  return (
    <Container>
      <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
      <article
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose mx-auto max-w-full"
      />
      <a
        className="mt-4 bg-gray-500 hover:bg-gray-800 text-white font-bold px-4 py-2 rounded-md self-end cursor-pointer"
        onClick={() => {
          modal.showModal(<Newsletter modal />);
        }}
      >
        Subscribe to the newsletter →
      </a>
    </Container>
  );
}
