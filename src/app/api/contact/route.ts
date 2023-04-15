import { getMailTransporter } from "@/lib/getMailTransporter";
import { Contact } from "@/types/Contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = (await request.json()) as Contact;
    const transporter = getMailTransporter();
    const { SMTP_FROM: from, SMTP_TO: to } = process.env;

    await transporter
      .sendMail({
        from,
        to,
        subject: `Contact: ${name}`,
        text: `email:
${email}

message:
${message}`,
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
