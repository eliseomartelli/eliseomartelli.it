"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Card } from "./Card";
import { Input } from "./Input";
import Button, { Color } from "./Button";
import { checkEmail } from "@/lib/checkEmail";
import { Loading } from "./Icons";

enum FormState {
  Valid,
  Input,
  Sent,
  Sending,
  Error,
}

export const Newsletter = () => {
  const [state, setState] = useState<FormState>(FormState.Input);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    setState(checkEmail(email) ? FormState.Valid : FormState.Input);
  }, [email]);

  const formButton =
    FormState.Valid === state ? (
      <Button
        small
        color={Color.Red}
        className="absolute right-1.5 top-1/2 -translate-y-1/2"
      >
        <input type="submit" value="Subscribe" />
      </Button>
    ) : FormState.Input === state ? (
      <Button
        small
        color={Color.Red}
        disabled
        className="absolute right-1.5 top-1/2 -translate-y-1/2"
      >
        <input type="submit" value="Subscribe" />
      </Button>
    ) : FormState.Sent === state ? (
      <Button
        small
        color={Color.Green}
        disabled
        className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        Subscribed!
      </Button>
    ) : FormState.Sending === state ? (
      <Button
        small
        color={Color.Purple}
        disabled
        className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-white"
      >
        <Loading className="fill-white" />
      </Button>
    ) : (
      <></>
    );

  const submitFunction = (e: FormEvent) => {
    e.preventDefault();
    if (state !== FormState.Valid) {
      return;
    }
    setState(FormState.Sending);
    setTimeout(() => {
      setState(FormState.Sent);
    }, 1000);
  };
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Newsletter</h2>
      <Card>
        <form className="flex flex-col gap-2" onSubmit={submitFunction}>
          {state === FormState.Error ? (
            <p className="text-red-500 font-bold">
              Error subscribing to the newsletter. Try later.
            </p>
          ) : (
            <>
              Stay in the loop to get news about software development and tech.
              <fieldset className="relative w-full">
                <Input
                  value={email}
                  type="email"
                  placeholder="john@doe.com"
                  className="pr-32 w-full"
                  disabled={state === FormState.Sending}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
                {formButton}
              </fieldset>
            </>
          )}
        </form>
      </Card>
    </section>
  );
};
