import { newsletterService } from "@/app/api/newsletter/common";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { UnsubButton } from "./button";

export const metadata: Metadata = { title: "Unsubscribe Newsletter" };

const UnsubscribeNewsletterPage = async ({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) => {
  const { uuid } = await params;

  const subscriber = await newsletterService.getSubscriber(uuid);

  if (!subscriber) {
    notFound();
  }

  const { email } = subscriber;

  return (
    <section className="prose">
      <p>Are you sure you want to unsuscribe {email}?</p>
      <UnsubButton uuid={uuid} />
    </section>
  );
};

export default UnsubscribeNewsletterPage;
