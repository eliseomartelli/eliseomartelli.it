import { allPosts } from "@/.contentlayer/generated";
import { compareDesc } from "date-fns";

export const allSortedPosts = allPosts.sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date));
});
