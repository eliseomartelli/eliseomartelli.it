import { useContext } from "react";
import { ModalContext } from "../providers/Modal";

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
        <button
          className="mt-4 bg-red-800 text-white font-bold px-4 py-2 rounded-md"
          onClick={() => {
            modal.showModal(<ContactModal />);
          }}
        >
          Get in touch
        </button>
      </div>
      <div className="w-32 h-32 flex justify-center items-center relative">
        <div className="bg-red-400 block w-32 h-32 rounded-full absolute -z-10"></div>
        <div className="absolute w-48 h-48 overflow-visible">
          <video width={192} height={192} autoPlay loop muted playsInline>
            <source src="/memoji-hevc-safari.mp4" type="video/mp4" />
            <source src="/memoji-vp9-chrome.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </div>
  );
}

function ContactModal(): JSX.Element {
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
      <input
        type="submit"
        value="Send"
        className="p-2 rounded-md bg-red-800 text-white font-bold"
      />
    </form>
  );
}
