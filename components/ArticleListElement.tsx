import Link from "next/link";

export default function ArticleListElement(): JSX.Element {
  return (
    <Link href="/" passHref>
      <a className="hover:bg-gray-100">
        <h3 className="font-bold text-xl">Lorem ipsum dolor sit amet</h3>
        <p>lorem ipsum dolor sit amet aofjadkf jdjkfak afjd</p>
        <p className="mt-4">Aug 30, 2022</p>
      </a>
    </Link>
  );
}
