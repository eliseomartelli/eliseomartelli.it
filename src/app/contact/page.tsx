import WidthLimit from "@/components/WidthLimit";
import Link from "next/link";
import { ContactForm } from "./form";
import { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { Article } from "@/components/Article";

export const metadata: Metadata = {
  title: "Contact - Eliseo Martelli",
  description: "Contact me easily",
};

const Contact = () => {
  return (
    <PageLayout routes={[{ name: "Get in touch", href: "/contact" }]} center>
      <WidthLimit>
        <Article>
          <p>
            I&apos;d love to hear from you and learn more about how we can work
            together. Let&apos;s start a conversation and see where it takes us!
          </p>
          <p>
            Just fill out the contact form below or send me an{" "}
            <Link href={"mailto:info@eliseomartelli.it"}>email</Link>, and
            I&apos;ll get back to you as soon as possible.
          </p>
          <ContactForm />
        </Article>
      </WidthLimit>
    </PageLayout>
  );
};

export default Contact;
