import {
  createContext,
  createRef,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const modalRef = createRef<HTMLDivElement>();
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

  useEffect(() => {
    const body = document.querySelector("body");
    const scrollbarWidth =
      window.innerWidth - document.documentElement.offsetWidth;
    body!.style.overflow = open ? "hidden" : "auto";
    body!.style.paddingRight = open ? 2 * scrollbarWidth + "px" : "";
    body!.style.marginRight = open ? -scrollbarWidth + "px" : "";
  }, [open]);

  const escFunction = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      initialState.hideModal();
    }
    if (event.key === "Tab") {
      const focusableElements = Array.from(
        (modalRef.current as Element).querySelectorAll(
          "a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])"
        )
      );
      const first = focusableElements[0] as HTMLElement;
      var last = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (!focusableElements.includes(document.activeElement!)) {
        if (event.shiftKey) {
          last.focus();
        } else {
          first.focus();
        }
        return event.preventDefault();
      }

      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        return event.preventDefault();
      }
      if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        return event.preventDefault();
      }
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", escFunction, true);
    } else {
      document.removeEventListener("keydown", escFunction, true);
    }

    return () => {
      document.removeEventListener("keydown", escFunction, true);
    };
  }, [open]);

  return (
    <ModalContext.Provider value={initialState}>
      <div
        className={`bg-black/80 backdrop-blur-md fixed top-0 left-0 bottom-0 right-0 w-full h-full flex justify-center items-center z-10 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity`}
      >
        <div
          className="absolute w-full h-full"
          onClick={() => {
            initialState.hideModal();
          }}
        ></div>
        <div
          className="relative bg-white p-4 mx-4 w-full max-w-2xl box-content rounded-md shadow-md"
          role="dialog"
          aria-modal="true"
          ref={modalRef}
        >
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

export const useModal = (): ModalContextType => useContext(ModalContext);
