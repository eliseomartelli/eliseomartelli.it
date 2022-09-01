import { FormEvent, useContext, useEffect, useState } from "react";
import { ModalContext } from "../providers/Modal";
import Button, { Color } from "./Button";
import LoadingSpinner from "./LoadingSpinner";

export default function Bio(): JSX.Element {
  const modal = useContext(ModalContext);

  return (
    <div className="flex sm:flex-row flex-col-reverse sm:items-center w-full gap-6 my-6">
      <div className="flex flex-col gap-2 sm:flex-1 items-start">
        <h1 className="font-bold text-4xl">Eliseo Martelli</h1>
        <p>Freelance software developer from 🇮🇹</p>
        <p className="mt-2 text-gray-500">
          Helping people build modern & compelling digital experiences.
        </p>
        <Button
          className="mt-4"
          color={Color.Red}
          onClick={() => {
            modal.showModal(<ContactModal />);
          }}
        >
          Get in touch
        </Button>
      </div>
      <div className="w-32 h-32 flex justify-center items-center relative">
        <div className="bg-red-400 block w-32 h-32 rounded-full absolute -z-10"></div>
        <div className="absolute w-48 h-48">
          <video
            width={192}
            height={192}
            autoPlay
            loop
            muted
            playsInline
            className="overflow-hidden"
          >
            <source src="/memoji-hevc-safari.mp4" type="video/mp4" />
            <source src="/memoji-vp9-chrome.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </div>
  );
}

enum FormState {
  Initial,
  Loading,
  Error,
  Success,
}

function ContactModal(): JSX.Element {
  const [state, setState] = useState<FormState>(FormState.Initial);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (state != FormState.Initial) {
      setState(FormState.Initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, message]);

  async function formSubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      email.length == 0 ||
      message.length == 0 ||
      name.length == 0 ||
      state != FormState.Initial
    ) {
      return;
    }
    setState(FormState.Loading);
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ name, email, message }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { error } = await res.json();
    if (error) {
      setState(FormState.Error);
      return;
    }
    setState(FormState.Success);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={formSubmission}>
      <h2 className="font-bold text-2xl text-center">Contact Me</h2>
      <input
        type="name"
        placeholder="Name"
        className="border px-4 py-2 rounded-md"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail"
        className="border px-4 py-2 rounded-md"
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        name="message"
        placeholder="Message..."
        rows={5}
        className="border px-4 py-2 rounded-md resize-none"
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        disabled={
          email.length == 0 ||
          message.length == 0 ||
          name.length == 0 ||
          state != FormState.Initial
        }
        className="justify-center flex"
        color={
          state == FormState.Initial ||
          state == FormState.Error ||
          state == FormState.Loading
            ? Color.Red
            : Color.Green
        }
      >
        {(state == FormState.Initial || state == FormState.Error) && "Send"}
        {state == FormState.Success && "E-mail sent"}
        {state == FormState.Loading && <LoadingSpinner />}
      </Button>
    </form>
  );
}
