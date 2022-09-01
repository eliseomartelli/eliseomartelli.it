import Link from "next/link";
import Button, { Color } from "../components/Button";
import Container from "../components/Container";

export default function NotFound(): JSX.Element {
  return (
    <Container>
      <h1>404 Not found</h1>
      <iframe
        allow="autoplay *; encrypted-media *;"
        frameBorder="0"
        height="150"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src="https://embed.music.apple.com/it/album/i-still-havent-found-what-im-looking-for/1442950015?i=1442950019&l=en"
      />
      <p>
        I can&apos;t find this page but I&apos;m sure you will find something
        interesting here.
      </p>
      <Link href="/" passHref>
        <Button className="self-start" color={Color.Red}>
          Go home →
        </Button>
      </Link>
    </Container>
  );
}
