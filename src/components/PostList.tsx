import { Post } from "@/.contentlayer/generated/types";
import { BlogPostItem } from "./BlogPostItem";

export const PostList = ({ posts }: { posts: Post[] }) => (
  <ul className="flex flex-col gap-4 w-full mb-8">
    {posts.map((post) => (
      <li key={post._id}>
        <BlogPostItem {...post} />
      </li>
    ))}
  </ul>
);
