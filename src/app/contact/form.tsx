"use client";
import Button, { Color } from "@/components/Button";
import { Loading } from "@/components/Icons";
import { Input, Textarea } from "@/components/Input";
import { checkEmail } from "@/lib/checkEmail";
import { checkMessage } from "@/lib/checkMessage";
import { checkName } from "@/lib/checkName";
import { Contact } from "@/types/Contact";
import { FormEvent, useEffect, useState } from "react";

enum FormState {
  Valid,
  Input,
  Sent,
  Sending,
  Error,
}

export const ContactForm = () => {
  const [state, setState] = useState<FormState>(FormState.Input);
  const [formData, setFormData] = useState<Contact>({
    name: "",
    email: "",
    message: "",
  });

  const submitFunction = async (e: FormEvent) => {
    e.preventDefault();
    setState(FormState.Sending);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      setState(FormState.Error);
    }
    setState(FormState.Sent);
  };

  useEffect(() => {
    const valid =
      checkEmail(formData.email) &&
      checkMessage(formData.message) &&
      checkName(formData.name);
    setState(valid ? FormState.Valid : FormState.Input);
  }, [formData]);

  const whenSending = state === FormState.Sending;

  const formButton =
    FormState.Valid === state ? (
      <Button color={Color.Red}>
        <input type="submit" value="Send" />
      </Button>
    ) : FormState.Input === state ? (
      <Button color={Color.Red} disabled>
        Send
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
      className="flex flex-col gap-4 max-w-xl mx-auto"
      onSubmit={submitFunction}
    >
      <Input
        disabled={whenSending}
        placeholder="John Doe"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.currentTarget.value })
        }
      />
      <Input
        disabled={whenSending}
        placeholder="john@doe.com"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.currentTarget.value })
        }
      />
      <Textarea
        disabled={whenSending}
        className="resize-none"
        rows={5}
        placeholder="Hi Eliseo, I want to let you know..."
        value={formData.message}
        onChange={(e) =>
          setFormData({ ...formData, message: e.currentTarget.value })
        }
      />
      {formButton}
    </form>
  );
};
