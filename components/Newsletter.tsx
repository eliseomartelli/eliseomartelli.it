import { FormEvent, useContext, useEffect, useState } from "react";
import { ModalContext } from "../providers/Modal";
import Button, { Color } from "./Button";
import LoadingSpinner from "./LoadingSpinner";

interface NewsletterProps {
  modal?: boolean;
}
enum FormState {
  Initial,
  Loading,
  Error,
  Success,
}

export function Newsletter({ modal: isModal }: NewsletterProps): JSX.Element {
  const modal = useContext(ModalContext);

  const [state, setState] = useState<FormState>(FormState.Initial);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (state != FormState.Initial) {
      setState(FormState.Initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  async function formSubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.length == 0 || state != FormState.Initial) {
      return;
    }
    setState(FormState.Loading);
    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { error } = await res.json();
    if (error) {
      setError(error);
      setState(FormState.Error);
      return;
    }
    setState(FormState.Success);
    setTimeout(() => {
      modal.hideModal();
    }, 1500);
  }

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Subscribe to the newsletter</h3>
      <form
        className={`flex flex-col gap-2 ${
          !isModal && "p-4 border rounded-md bg-gray-50"
        }`}
        onSubmit={formSubmission}
      >
        <p>Stay in the loop to get news about software development and tech.</p>
        <fieldset className="relative">
          <input
            type="email"
            placeholder="john@apple.com"
            className="px-4 py-2 border rounded-md w-full pr-32"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <Button
            color={
              state == FormState.Initial ||
              state == FormState.Error ||
              state == FormState.Loading
                ? Color.Red
                : Color.Green
            }
            small
            disabled={email.length == 0 || state != FormState.Initial}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 transition-all"
          >
            {(state == FormState.Initial || state == FormState.Error) &&
              "Subscribe"}{" "}
            {state == FormState.Loading && <LoadingSpinner />}{" "}
            {state == FormState.Success && "Subscribed"}{" "}
          </Button>{" "}
        </fieldset>
        {state == FormState.Error && (
          <p className="text-sm text-gray-600">{error}</p>
        )}
        {state == FormState.Success && (
          <p className="text-sm text-gray-600">
            Check your email to confirm the subscription.
          </p>
        )}
      </form>
    </section>
  );
}
