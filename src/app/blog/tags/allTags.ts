import { allPosts } from "contentlayer/generated";

export const allTags = allPosts
  .map((post) => post.tags)
  .flat()
  .filter((tag, index, array) => array.indexOf(tag) === index)
  .sort();
