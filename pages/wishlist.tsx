import fs from "fs";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import React from "react";
import Container from "../components/Container";
import { mdxToHTML } from "../lib/mdx";

const wishlist = (props: { content: MDXRemoteSerializeResult }) => {
  return (
    <Container
      customMeta={{
        title: `Wishlist - Eliseo Martelli`,
        description: "Things I might eventually need/things I want.",
      }}
    >
      <article className="prose mx-auto w-full max-w-full prose-img:mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Wishlist</h1>
        </div>
        <MDXRemote lazy {...props.content} />
      </article>
    </Container>
  );
};

export async function getStaticProps(): Promise<{
  props: {
    content: MDXRemoteSerializeResult;
  };
}> {
  const filePath = path.join("wishlist.md");
  const file = fs.readFileSync(filePath, "utf-8");
  const { html } = await mdxToHTML(file);
  return {
    props: {
      content: html,
    },
  };
}

export default wishlist;
