import React, { ReactNode, useEffect } from "react";
import Button, { Color } from "./Button";
import { XMark } from "./Icons";
import { useLockBody } from "@/hooks/useLockBodyScroll";
import moo from "@eliseomartelli/moo/dist";

export const Modal = ({
  children,
  onClose,
  open,
}: {
  children: ReactNode;
  onClose: Function;
  open: boolean;
}) => {
  useLockBody(open);
  return (
    <div
      className={moo(
        ["translate-x-0", open],
        ["-translate-x-full opacity-0 pointer-events-none", !open],
        "fixed w-screen h-screen bg-stone-50 transition-all z-50 duration-100",
      )}
      onClick={() => onClose()}
    >
      <Button
        className="text-stone-950 float-left m-4"
        color={Color.Transparent}
        onClick={() => onClose()}
      >
        <XMark />
      </Button>
      {children}
    </div>
  );
};
