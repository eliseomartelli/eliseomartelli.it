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
        ["w-screen h-screen", open],
        ["w-0 h-0 opacity-0 pointer-events-none", !open],
        "fixed left-0 top-0 bg-stone-50 transition-all z-50 duration-500",
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
