import Container from "../components/Container";
import { Newsletter as NewsletterComponent } from "../components/Newsletter";

function Newsletter(): JSX.Element {
  return (
    <Container>
      <h3 className="font-bold text-3xl">Newsletter</h3>
      <p>lorem ipsum dolor sit amet</p>
      <NewsletterComponent />
    </Container>
  );
}

export default Newsletter;
