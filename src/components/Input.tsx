import moo from "@eliseomartelli/moo/dist";
import React from "react";

const BASE_STYLE = "px-4 py-2 rounded-md border";

export const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input {...props} className={moo(BASE_STYLE, props.className!)}></input>
  );
};

export const Textarea = (
  props: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
) => {
  return <textarea {...props} className={moo(BASE_STYLE, props.className!)} />;
};
