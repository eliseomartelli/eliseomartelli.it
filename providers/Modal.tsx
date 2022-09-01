import { createContext, ReactNode, useEffect, useState } from "react";
import Button, { Color } from "../components/Button";
type ModalContextType = {
  hideModal: () => void;
  showModal: (e: ReactNode) => void;
  open: boolean;
};

export const ModalContext = createContext<ModalContextType>({
  hideModal: () => {},
  showModal: () => {},
  open: false,
});

export function ModalProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<ReactNode>();
  const initialState: ModalContextType = {
    hideModal: () => {
      setOpen(false);
      setTimeout(() => setModal(null), 200);
    },
    showModal: (modal: ReactNode) => {
      setModal(modal);
      setOpen(true);
    },
    open: open,
  };

  const escFunction = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      initialState.hideModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, true);

    return () => {
      document.removeEventListener("keydown", escFunction, true);
    };
  }, []);

  return (
    <ModalContext.Provider value={initialState}>
      <div
        className={`bg-black/75 fixed top-0 left-0 bottom-0 right-0 w-full h-full flex justify-center items-center z-10 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity`}
      >
        <div
          className="absolute w-full h-full"
          onClick={() => {
            initialState.hideModal();
          }}
        ></div>
        <div className="relative bg-white p-4 mx-4 w-full max-w-2xl box-content rounded-md shadow-md">
          <Button
            color={Color.Transparent}
            ariaLabel="Close modal"
            className="absolute top-0 right-0 p-4"
            onClick={() => {
              initialState.hideModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
          {modal}
        </div>
      </div>
      {children}
    </ModalContext.Provider>
  );
}
