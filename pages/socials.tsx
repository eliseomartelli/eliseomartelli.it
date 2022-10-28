import Container from "../components/Container.tsx";
import { socials } from "../socials.ts";

export default function () {
  return (
    <Container>
      <div class="prose">
        <h1>Socials</h1>
        <p>
          Here are some social media websites (and an email) you can use to keep
          in touch with me. I'll use the appropriate platform for the media I'm
          sharing.
        </p>
        <ul>
          {socials.map((e, i) => (
            <li key={i}>
              <a href={e.url} target="_blank" rel="noopener noreferrer">
                {e.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
