import { defineCollection } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";

export const newsletter = defineCollection({
  name: "newsletter",
  directory: "data/newsletter",
  include: "*.md*",
  schema: (zod) => ({
    title: zod.string(),
  }),

  transform: async (document, context) => {
    const html = await compileMarkdown(context, document);
    const slug = document._meta.fileName.split(".")[0];
    return { ...document, html, slug };
  },
});
