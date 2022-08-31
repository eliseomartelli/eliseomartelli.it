import Container from "../components/Container";

export default function Contact(): JSX.Element {
  return (
    <Container>
      <ContactModal />
    </Container>
  );
}

/*TODO: Move to own module*/
function ContactModal(): JSX.Element {
  return (
    <form className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl text-center">Contact Me</h2>
      <input
        type="name"
        placeholder="Name"
        className="border px-4 py-2 rounded-md"
      />
      <input
        type="email"
        placeholder="E-mail"
        className="border px-4 py-2 rounded-md"
      />
      <textarea
        name="message"
        placeholder="Message..."
        rows={5}
        className="border px-4 py-2 rounded-md resize-none"
      />
      <input
        type="submit"
        value="Send"
        className="p-2 rounded-md bg-red-800 text-white font-bold"
      />
    </form>
  );
}
