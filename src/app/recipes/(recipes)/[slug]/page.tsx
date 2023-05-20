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

const RecipeTitle = ({ recipe }: { recipe: Recipe }) => (
  <section
    className={moo(
      "not-prose",
      "text-black",
      "text-center",
      "flex",
      "flex-col",
      "gap-2",
      "items-center",
      "align-middle",
      "mb-8"
    )}
  >
    <h1 className={moo("font-bold", "text-3xl")}>
      <Balancer>{recipe.title}</Balancer>
    </h1>
    <p>{recipe.excerpt}</p>
    <span className="flex gap-2">
      <Taglet>
        <Clock />
        {recipe.prep_time}
      </Taglet>
      <Taglet>
        <Fire />
        {recipe.cook_time}
      </Taglet>
    </span>
    <Taglet>{recipe.category}</Taglet>
  </section>
);

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
    (post) => post._raw.flattenedPath === `recipes/${params.slug}`
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
    (post) => post._raw.flattenedPath === `recipes/${params.slug}`
  ) as Recipe;

  if (!recipe) {
    notFound();
  }

  return (
    <article className="prose mx-auto px-4 w-full">
      <RecipeTitle recipe={recipe} />
      <MDXComponent code={recipe.body.code} />
    </article>
  );
};

export default PostPage;
