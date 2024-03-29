"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Card } from "./Card";
import { Input } from "./Input";
import Button, { Color, getButtonClassNames } from "./Button";
import { checkEmail } from "@/lib/checkEmail";
import { ArrowUpHighIcon, Loading } from "./Icons";
import Link from "next/link";

enum FormState {
  Valid,
  Input,
  Sent,
  Sending,
  Error,
}

export const Newsletter = ({ showTitle = true }: { showTitle?: boolean }) => {
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

  const submitFunction = async (e: FormEvent) => {
    e.preventDefault();
    setState(FormState.Sending);
    const response = await fetch(`/api/newsletter/subscribe/${email}`, {
      method: "POST",
    });
    if (!response.ok) {
      setState(FormState.Error);
    }
    setState(FormState.Sent);
  };
  return (
    <section className="flex flex-col gap-4 w-full">
      {showTitle && <h2 className="text-2xl font-bold">Newsletter</h2>}
      <Card>
        <form className="flex flex-col gap-2" onSubmit={submitFunction}>
          {state === FormState.Error ? (
            <p className="text-red-500 font-bold">
              Error subscribing to the newsletter. Try later.
            </p>
          ) : (
            <>
              <p className="">
                Stay in the loop and get news about what I have my eyes on!
              </p>
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
      {showTitle && (
        <Link
          href={"/newsletter"}
          className={getButtonClassNames({
            small: true,
            noBold: true,
            color: Color.Transparent,
            className: "group inline-flex items-center gap-2 self-end",
          })}
        >
          Past Issues
          <ArrowUpHighIcon className="h-4 w-4 group-hover:rotate-45 transition-all" />
        </Link>
      )}
    </section>
  );
};
