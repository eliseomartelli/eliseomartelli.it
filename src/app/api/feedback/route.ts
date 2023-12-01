import { checkMessage } from "@/lib/checkMessage";
import { getMailTransporter } from "@/lib/getMailTransporter";
import { Feedback } from "@/types/Feedback";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = (await request.json()) as Feedback;

    if (!checkMessage(message)) {
      return NextResponse.json(
        { message: "Message not valid" },
        { status: 400 },
      );
    }

    const transporter = getMailTransporter();
    const { SMTP_FROM: from, SMTP_TO: to } = process.env;

    await transporter.sendMail({
      from,
      to,
      subject: "Feedback/NGL",
      text: message,
    });
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
