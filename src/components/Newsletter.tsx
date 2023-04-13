"use client";

import React, { useState } from "react";
import { Card } from "./Card";
import { Input } from "./Input";
import Button, { Color } from "./Button";

export const Newsletter = () => {
  const [email, setEmail] = useState<string>("");
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Newsletter</h2>
      <Card>
        <form className="flex flex-col gap-2">
          Stay in the loop to get news about software development and tech.
          <fieldset className="relative w-full">
            <Input
              value={email}
              type="email"
              placeholder="john@doe.com"
              className="pr-32 w-full"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <Button
              small
              color={Color.Red}
              className="absolute right-1.5 top-1/2 -translate-y-1/2"
            >
              <input type="submit" value="Subscribe" />
            </Button>
          </fieldset>
        </form>
      </Card>
    </section>
  );
};
