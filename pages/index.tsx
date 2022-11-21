import Link from "next/link";
import Bio from "../components/Bio";
import Container from "../components/Container";
import { Newsletter } from "../components/Newsletter";
import { featuredPosts } from "../featuredPosts";
import { loadPostsByFile } from "../lib/posts";
import { Post } from "../types/post";

function Home({ featuredPosts }: { featuredPosts: Post[] }) {
  return (
    <Container>
      <Bio />
      <FeaturedPosts posts={featuredPosts} />
      <Newsletter />
    </Container>
  );
}

function FeaturedPosts({ posts }: FeaturedPostsProps): JSX.Element {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <h2 className="text-2xl font-bold">Featured Posts</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((post, key) => (
          <li key={key}>
            <Link
              href={`/blog/${post.slug}`}
              passHref
              className="bg-gray-50 hover:bg-gray-200 rounded-md p-4 border flex flex-col justify-between gap-8 h-full cursor-pointer">

              <h3 className="font-semibold">{post.frontmatter.title}</h3>
              <p>{post.frontmatter.date}</p>

            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/blog"
        passHref
        className="text-gray-800 hover:text-gray-500 transition-colors self-end">
        
          View all posts →
        
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      featuredPosts: loadPostsByFile(featuredPosts),
    },
  };
}

interface FeaturedPostsProps {
  posts: Post[];
}

export default Home;
