import Container from "../components/Container";
import { socials } from "../socials";

export default function Socials(): JSX.Element {
  return (
    <Container>
      <div className="prose">
        <h1>Socials</h1>
        <p>
          Here are some social media websites (and an email) you can use to keep
          in touch with me. I&apos;ll use the appropriate platform for the media
          I&apos;m sharing.
        </p>
        <ul>
          {socials.map((e, i) => (
            <li key={i}>
              <a href={e.url} target="_blank" rel="noopener noreferrer me">
                {e.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
