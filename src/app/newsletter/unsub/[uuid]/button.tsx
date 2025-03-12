"use client";

import { Button } from "@/components/ui/button";
import { NewsletterClient } from "@/lib/client/NewsletterClient";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const UnsubButton = ({ uuid }: { uuid: string }) => {
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <>
      <Button
        variant="destructive"
        onClick={async () => {
          try {
            await new NewsletterClient().unsubscribe(uuid);
            alert("Unsubscribed");
            router.push("/");
          } catch (error) {
            setError((error as Error).message);
          }
        }}
      >
        Unsubscribe
      </Button>
      <p className="text-red-500">{error}</p>
    </>
  );
};
