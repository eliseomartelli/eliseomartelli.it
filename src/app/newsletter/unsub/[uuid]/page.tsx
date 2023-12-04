import { Article } from "@/components/Article";
import { Color, getButtonClassNames } from "@/components/Button";
import { PageLayout } from "@/components/PageLayout";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const prisma = new PrismaClient();

export const metadata = {
  title: "unsub - Eliseo Martelli",
};

const UnsubPage = async ({ params }: { params: { uuid: string } }) => {
  const user = await prisma.subscriber.findUnique({
    where: {
      unsub: params.uuid,
    },
  });
  if (!user) {
    notFound();
  }
  return (
    <PageLayout routes={[{ name: "Unsubscribe from Newsletter", href: "" }]}>
      <Article>
        Are you sure you want to unsubscribe?
        <br /> email: <b>{user.email}</b>
        <br />
        <div className="not-prose inline-flex gap-4 my-4">
          <Link
            className={getButtonClassNames({
              color: Color.Red,
            })}
            href={`/newsletter/unsub/${params.uuid}/confirm`}
          >
            Yes
          </Link>
          <Link
            className={getButtonClassNames({
              color: Color.Transparent,
            })}
            href={"/"}
          >
            No
          </Link>
        </div>
      </Article>
    </PageLayout>
  );
};

export default UnsubPage;
