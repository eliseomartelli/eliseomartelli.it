import { ContactForm } from "@/components/custom/contact-form";
import Link from "next/link";
import React from "react";

export default function ContactPage() {
  return (
    <article className="prose w-full mx-auto">
      <h1 className="font-serif">Get in touch</h1>
      <p>
        I'd love to hear from you and learn more about how we can work together.
        Let's start a conversation and see where it takes us!
      </p>
      <p>
        Just fill out the contact form below or send me an{" "}
        <Link href="mailto:info@eliseomartelli.it">email</Link>, and I'll get
        back to you as soon as possible.
      </p>
      <ContactForm />
    </article>
  );
}
