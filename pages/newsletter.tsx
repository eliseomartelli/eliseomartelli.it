import Container from "../components/Container";
import { Newsletter as NewsletterComponent } from "../components/Newsletter";

function Newsletter(): JSX.Element {
  return (
    <Container customMeta={{ title: "Newsletter - Eliseo Martelli" }}>
      <h1>Newsletter</h1>
      <p>Get a behind the scenes look on what I&apos;m building.</p>
      <NewsletterComponent />
    </Container>
  );
}

export default Newsletter;
