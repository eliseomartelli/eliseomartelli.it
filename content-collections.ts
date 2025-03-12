import { about } from "@/lib/about";
import { newsletter } from "@/lib/newsletter";
import { photos } from "@/lib/photos";
import { posts } from "@/lib/posts";
import { defineConfig } from "@content-collections/core";

export default defineConfig({
  collections: [posts, about, photos, newsletter],
});
