import { FeedbackForm } from "@/components/custom/feedback-form";
import Link from "next/link";
import React from "react";

export default function FeedbackPage() {
  return (
    <article className="prose w-full mx-auto">
      <h1 className="font-serif">Feedback</h1>
      <FeedbackForm />
      <h2>Data collected</h2>
      <ul>
        <li>The message you&apos;re sending.</li>
      </ul>
      <p>
        I don&apos;t collect any more data than the message you are sending, by
        design.
      </p>
      <h2>Why not something third party?</h2>
      <ul>
        <li>Not fun enough. I like to build things.</li>
        <li>
          Privacy implications. You can check the{" "}
          <Link href="https://github.com/eliseomartelli/eliseomartelli.it">
            source code
          </Link>{" "}
          of this web application to see what I&apos;m collecting.
        </li>
      </ul>
      <h2>Want to say hi?</h2>
      <p>
        There&apos;s a form for that! <Link href={"/contact"}>Contact me</Link>.
      </p>
    </article>
  );
}
