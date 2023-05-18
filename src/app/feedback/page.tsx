import WidthLimit from "@/components/WidthLimit";
import { FeedbackForm } from "./form";
import { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Feedback - Eliseo Martelli",
  description: "Leave feedback, anonymously",
};

const Feedback = () => {
  return (
    <PageLayout routes={[{ name: "Feedback", href: "/feedback" }]}>
      <article className="prose mx-auto">
        <FeedbackForm />
        <h2>Data collected</h2>
        <ul>
          <li>The message you&apos;re sending.</li>
        </ul>
        <h2>Why not something like ngl?</h2>
        <ul>
          <li>Not fun enough.</li>
          <li>
            Privacy implications. You can check the source code of this web
            application to see what I&apos;m collecting.
          </li>
        </ul>
      </article>
    </PageLayout>
  );
};

export default Feedback;
