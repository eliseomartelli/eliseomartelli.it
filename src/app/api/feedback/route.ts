import { getMailTransporter } from "@/lib/getMailTransporter";
import { Feedback } from "@/types/Feedback";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = (await request.json()) as Feedback;
    const transporter = getMailTransporter();
    const { SMTP_FROM: from, SMTP_TO: to } = process.env;

    transporter
      .sendMail({
        from,
        to,
        subject: "Feedback/NGL",
        text: message,
      })
      .then(() => {
        return NextResponse.json({ message: "OK" }, { status: 200 });
      })
      .catch((error) => {
        return NextResponse.json({ message: error }, { status: 500 });
      });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
