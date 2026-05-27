import { defineCollection } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

export const partnership = defineCollection({
  name: "partnership",
  directory: "data/",
  include: "partnership.mdx",
  schema: () => ({}),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return { ...document, mdx };
  },
});
