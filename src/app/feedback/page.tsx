import WidthLimit from "@/components/WidthLimit";
import { FeedbackForm } from "./form";
import { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import Link from "next/link";
import { Color, getButtonClassNames } from "@/components/Button";

export const metadata: Metadata = {
  title: "Feedback - Eliseo Martelli",
  description: "Leave feedback, anonymously",
};

const Feedback = () => {
  return (
    <PageLayout routes={[{ name: "Feedback", href: "/feedback" }]} center>
      <WidthLimit>
        <article className="prose mx-auto">
          <FeedbackForm />
          <h2>Data collected</h2>
          <ul>
            <li>The message you&apos;re sending.</li>
          </ul>
          <p>
            I don&apos;t collect any more data than the message you are sending,
            by design.
          </p>
          <h2>Why not something like ngl?</h2>
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
          <p>There&apos;s a form for that!</p>
          <div className="not-prose">
            <Link
              href={"/contact"}
              className={getButtonClassNames({ color: Color.Red })}
            >
              Contact me
            </Link>
          </div>
        </article>
      </WidthLimit>
    </PageLayout>
  );
};

export default Feedback;
