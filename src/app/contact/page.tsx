import Button, { Color } from "@/components/Button";
import { Input, Textarea } from "@/components/Input";
import WidthLimit from "@/components/WidthLimit";
import Link from "next/link";

const Contact = () => {
  return (
    <WidthLimit className="p-4">
      <h1 className="text-4xl font-bold mb-4">Get in touch</h1>
      <section className="prose pb-8 mt-8 mx-auto w-full">
        <p>
          I'd love to hear from you and learn more about how we can work
          together. Let's start a conversation and see where it takes us!
        </p>
        <p>
          Just fill out the contact form below or send me an{" "}
          <Link href={"mailto:info@eliseomartelli.it"}>email</Link>, and I'll
          get back to you as soon as possible.
        </p>
      </section>
      <form className="flex flex-col gap-4 max-w-xl mx-auto">
        <Input placeholder="John Doe" />
        <Input placeholder="john@doe.com" />
        <Textarea
          className="resize-none"
          rows={5}
          placeholder="Hi Eliseo, I want to let you know..."
        />
        <Button color={Color.Red}>
          <input type="submit" value={"Send"} />
        </Button>
      </form>
    </WidthLimit>
  );
};

export default Contact;
