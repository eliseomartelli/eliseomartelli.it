import WidthLimit from "@/components/WidthLimit";
import Link from "next/link";
import { ContactForm } from "./form";
import { Metadata } from "next";
import * as typography from "@/components/Typography";

export const metadata: Metadata = {
  title: "Contact - Eliseo Martelli",
  description: "Contact me easily",
};

const Contact = () => {
  return (
    <WidthLimit>
      <typography.h1 className="text-4xl font-bold mb-4">
        Get in touch
      </typography.h1>
      <section className="prose pb-8 mt-8 mx-auto w-full">
        <p>
          I&apos;d love to hear from you and learn more about how we can work
          together. Let&apos;s start a conversation and see where it takes us!
        </p>
        <p>
          Just fill out the contact form below or send me an{" "}
          <Link href={"mailto:info@eliseomartelli.it"}>email</Link>, and
          I&apos;ll get back to you as soon as possible.
        </p>
      </section>
      <ContactForm />
    </WidthLimit>
  );
};

export default Contact;
