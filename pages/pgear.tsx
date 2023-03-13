import fs from "fs";
import { GetStaticPropsContext } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import React from "react";
import Container from "../components/Container";
import { Product } from "../components/Product";
import { mdxToHTML } from "../lib/mdx";

interface PGearProps {
  content: MDXRemoteSerializeResult;
}

const components = { Product };

const pgear = ({ content }: PGearProps) => {
  return (
    <Container>
      <article className="prose mx-auto w-full max-w-full prose-img:mx-auto">
        <MDXRemote {...content} components={components} lazy />
      </article>
    </Container>
  );
};

export default pgear;
export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ props: PGearProps }> {
  const filePath = path.join("./pgear.mdx");
  const file = fs.readFileSync(filePath, "utf-8");
  const { html } = await mdxToHTML(file);
  return {
    props: {
      content: html,
    },
  };
}
