import { checkEmail } from "@/lib/checkEmail";
import { getMailTransporter } from "@/lib/getMailTransporter";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  _: Request,
  { params }: { params: { email: string } },
) {
  try {
    if (!checkEmail(params.email)) {
      return NextResponse.json(
        { message: "Email not valid." },
        { status: 422 },
      );
    }
    const exists = await prisma.subscriber.findUnique({
      where: {
        email: params.email,
      },
    });
    if (exists != null) {
      return NextResponse.json(
        { message: "Email already present." },
        { status: 409 },
      );
    }
    const subscriber = await prisma.subscriber.create({
      data: {
        email: params.email,
      },
    });

    const transporter = getMailTransporter();
    const { NEWSLETTER_FROM: from } = process.env;

    await transporter.sendMail({
      from,
      bcc: subscriber.email,
      subject: "Welcome to the newsletter!",
      html: `Hi!<br/>
Welcome to my newsletter. You can <a href="https://eliseomartelli.it/newsletter/unsub/${subscriber.unsub}">unsubscribe</a> in any moment. Here I will share some of the things I'm working on.
<br/>
<br/>
See you soon!<br/>
Eliseo`,
    });
    return NextResponse.json({ message: "Subscribed." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
