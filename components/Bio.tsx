import { useContext, useState } from "react";
import { ModalContext } from "../providers/Modal";
import Button, { Color } from "./Button";

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

function ContactModal(): JSX.Element {
  const [sending, setSending] = useState(false);
  return (
    <form className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl text-center">Contact Me</h2>
      <input
        type="name"
        placeholder="Name"
        className="border px-4 py-2 rounded-md"
      />
      <input
        type="email"
        placeholder="E-mail"
        className="border px-4 py-2 rounded-md"
      />
      <textarea
        name="message"
        placeholder="Message..."
        rows={5}
        className="border px-4 py-2 rounded-md resize-none"
      />
      <Button
        className="justify-center flex"
        color={Color.Red}
        onClick={(e) => {
          e.preventDefault();
          setSending(!sending);
        }}
      >
        {!sending && "Send"}
        {sending && (
          <svg
            className="-ml-3 h-6 w-10 self-center relative animate-spin"
            xmlns="
            http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth={4}
            ></circle>
            <path
              className="opacity-100"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </Button>
    </form>
  );
}
