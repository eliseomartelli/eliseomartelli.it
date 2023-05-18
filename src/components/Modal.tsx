import React, { ReactNode } from "react";
import Button, { Color } from "./Button";
import { XMark } from "./Icons";
import WidthLimit from "./WidthLimit";
import { useLockBody } from "@/hooks/useLockBodyScroll";

export const Modal = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: Function;
}) => {
  useLockBody();
  return (
    <div
      className="bg-gray-600/60 w-screen h-screen fixed top-0 left-0"
      onClick={() => onClose()}
    >
      <WidthLimit>
        <div className="p-3 flex flex-col items-end">
          <Button
            className="text-white"
            color={Color.DarkGray}
            onClick={() => onClose()}
          >
            <XMark />
          </Button>
        </div>
      </WidthLimit>
      {children}
    </div>
  );
};
