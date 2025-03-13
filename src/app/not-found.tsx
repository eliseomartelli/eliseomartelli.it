import { PostList } from "@/components/custom/post-list";
import { Button } from "@/components/ui/button";
import { allSortedPosts } from "@/lib/sortedPosts";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <article className="prose w-full mx-auto">
        <h1>Uh, oh</h1>
        <p>I couldn&apos;t find that page...</p>
        <iframe
          allow="autoplay *; encrypted-media *;"
          height="150"
          className="w-full max-w-2xl overflow-hidden bg-transparent"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src="https://embed.music.apple.com/it/album/i-still-havent-found-what-im-looking-for/1442950015?i=1442950019&l=en"
        />
        <p className="not-prose mt-4">
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
        </p>
      </article>
      <PostList postlist={allSortedPosts.slice(0, 3)} />
    </>
  );
};

export default NotFound;
