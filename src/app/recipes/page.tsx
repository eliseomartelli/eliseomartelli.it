import React from "react";
import WidthLimit from "@/components/WidthLimit";
import { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { allRecipes } from "@/.contentlayer/generated/index.mjs";
import { Card } from "@/components/Card";
import Link from "next/link";
import { Taglet } from "@/components/Taglet";
import { Clock, Fire } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Recipes - Eliseo Martelli",
};

const Recipes = () => {
  return (
    <PageLayout routes={[{ name: "Recipes", href: "/recipes" }]}>
      <WidthLimit className="flex gap-4 flex-col">
        {allRecipes.map((recipe) => (
          <Link
            href={recipe._raw.flattenedPath}
            key={recipe._raw.flattenedPath}
            className="w-full"
          >
            <Card
              className="flex justify-between flex-col -mx-4 !gap-2"
              noBackground
              noBorder
            >
              <div>
                <h2 className="font-bold text-xl">{recipe.title}</h2>
                <p>{recipe.excerpt}</p>
              </div>
              <div className="flex gap-2">
                <Taglet key={recipe.category + recipe._raw.flattenedPath}>
                  {recipe.category}
                </Taglet>
                <Taglet>
                  <Clock />
                  {recipe.prep_time}
                </Taglet>
                <Taglet>
                  <Fire />
                  {recipe.cook_time}
                </Taglet>
              </div>
            </Card>
          </Link>
        ))}
      </WidthLimit>
    </PageLayout>
  );
};

export default Recipes;
