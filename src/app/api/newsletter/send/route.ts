import { allSortedNewsletters } from "@/lib/data/allSortedNewsletters";
import { getMailTransporter } from "@/lib/getMailTransporter";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const newsletter = allSortedNewsletters.at(0);
  if (!newsletter || newsletter == undefined) {
    return NextResponse.json({ message: "No newsletters." }, { status: 200 });
  }

  const sent = await prisma.lastSent.findFirst({
    where: {
      sent: { equals: newsletter._id },
    },
  });

  if (sent != null) {
    return NextResponse.json({ message: "Already sent." }, { status: 200 });
  }

  await prisma.lastSent.create({
    data: {
      sent: newsletter._id,
    },
  });

  const subscribers = await prisma.subscriber.findMany();
  const transporter = getMailTransporter();
  const { NEWSLETTER_FROM: from } = process.env;

  subscribers.map(async (e) => {
    await transporter.sendMail({
      from,
      to: e.email,
      subject: newsletter.title,
      html: `${newsletter.body.html}
<br />
<a href="https://eliseomartelli.it/newsletter/unsub/${e.unsub}">unsubscribe</a>`,
    });
  });

  return NextResponse.json({ message: "Sent." }, { status: 200 });
}
