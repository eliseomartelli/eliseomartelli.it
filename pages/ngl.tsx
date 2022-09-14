import { FormEvent, useEffect, useState } from "react";
import Button, { Color } from "../components/Button";
import Container from "../components/Container";
import LoadingSpinner from "../components/LoadingSpinner";

enum FormState {
  Normal,
  Sending,
  Sent,
}

export default function NGL(): JSX.Element {
  const [formState, setFormState] = useState(FormState.Normal);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (formState != FormState.Normal) {
      setFormState(FormState.Normal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  async function formSubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message.length == 0 || formState != FormState.Normal) {
      return;
    }
    setFormState(FormState.Sending);
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "anon",
        email: "anon",
        message: `NGL:

${message}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { error } = await res.json();
    if (error) {
      setFormState(FormState.Normal);
      return;
    }
    setFormState(FormState.Sent);
  }

  return (
    <Container customMeta={{ title: "NGL - Eliseo Martelli" }}>
      <form
        className="max-w-md w-full mx-auto flex flex-col gap-4"
        onSubmit={formSubmission}
      >
        <h1>NGL</h1>
        <textarea
          rows={2}
          placeholder={"Your question..."}
          className="px-4 py-2 border resize-none rounded-md w-full"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          className="justify-center flex"
          color={
            formState == FormState.Normal || formState == FormState.Sending
              ? Color.Red
              : Color.Green
          }
        >
          {formState == FormState.Normal && "Ask"}
          {formState == FormState.Sent && "Sent"}
          {formState == FormState.Sending && <LoadingSpinner />}
        </Button>
      </form>

      <article className="prose max-w-md mx-auto w-full">
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
    </Container>
  );
}
