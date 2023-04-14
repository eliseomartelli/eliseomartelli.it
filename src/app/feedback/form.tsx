"use client";

import Button, { Color } from "@/components/Button";
import { Loading } from "@/components/Icons";
import { Textarea } from "@/components/Input";
import { checkMessage } from "@/lib/checkMessage";
import { Feedback } from "@/types/Feedback";
import React, { FormEvent, useEffect, useState } from "react";

enum FormState {
  Valid,
  Input,
  Sent,
  Sending,
  Error,
}

export const FeedbackForm = () => {
  const [state, setState] = useState<FormState>(FormState.Input);
  const [message, setMessage] = useState("");
  const submitFunction = async (e: FormEvent) => {
    e.preventDefault();
    setState(FormState.Sending);
    const feedback: Feedback = { message: message };
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(feedback),
    });
    if (!response.ok) {
      setState(FormState.Error);
    }
    setState(FormState.Sent);
  };

  useEffect(() => {
    const valid = checkMessage(message);
    setState(valid ? FormState.Valid : FormState.Input);
  }, [message]);
  const formButton =
    FormState.Valid === state ? (
      <Button color={Color.Red}>
        <input type="submit" value="Ask" />
      </Button>
    ) : FormState.Input === state ? (
      <Button color={Color.Red} disabled>
        Ask
      </Button>
    ) : FormState.Sent === state ? (
      <Button color={Color.Green} disabled className="pointer-events-none">
        Sent!
      </Button>
    ) : FormState.Sending === state ? (
      <Button
        color={Color.Purple}
        disabled
        className="pointer-events-none flex justify-center"
      >
        <Loading className="fill-white" />
      </Button>
    ) : (
      <></>
    );

  return (
    <form
      className="flex flex-col rounded-md overflow-hidden max-w-xl mx-auto gap-4 w-full"
      onSubmit={submitFunction}
    >
      <Textarea
        placeholder="Your question..."
        className="resize-none"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      {formButton}
    </form>
  );
};
