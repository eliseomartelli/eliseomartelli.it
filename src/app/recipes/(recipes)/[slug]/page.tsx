import { MDXComponent } from "@/components/MDX";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import React from "react";
import { allRecipes } from "@/.contentlayer/generated/index.mjs";
import moo from "@eliseomartelli/moo/dist";
import { Recipe } from "@/.contentlayer/generated";
import Balancer from "react-wrap-balancer";
import { Taglet } from "@/components/Taglet";
import { Clock, Fire } from "@/components/Icons";
import { PostTitle } from "@/components/PostTitle";

export async function generateStaticParams() {
  return allRecipes.map((post) => ({
    slug: post._raw.sourceFileName.split(".")[0],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const post = allRecipes.find(
    (post) => post._raw.flattenedPath === `recipes/${params.slug}`,
  );
  if (!post) {
    return;
  }

  const { title, excerpt: description } = post;

  return {
    title: `${title} - Eliseo Martelli`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://eliseomartelli.it/${post._raw.flattenedPath}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const recipe = allRecipes.find(
    (post) => post._raw.flattenedPath === `recipes/${params.slug}`,
  ) as Recipe;

  if (!recipe) {
    notFound();
  }

  return (
    <article className="prose mx-auto px-4 w-full my-8">
      <PostTitle>
        <h1 className={moo("font-bold", "text-3xl")}>
          <Balancer>{recipe.title}</Balancer>
        </h1>
        <p>{recipe.excerpt}</p>
        <div className="flex flex-row gap-2 my-4">
          <Taglet>
            <Clock />
            {recipe.prep_time}
          </Taglet>
          <Taglet>
            <Fire />
            {recipe.cook_time}
          </Taglet>
        </div>
        <Taglet>{recipe.category}</Taglet>
      </PostTitle>
      <MDXComponent code={recipe.body.code} />
    </article>
  );
};

export default PostPage;
