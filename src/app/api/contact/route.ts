import { checkEmail } from "@/lib/checkEmail";
import { checkMessage } from "@/lib/checkMessage";
import { checkName } from "@/lib/checkName";
import { getMailTransporter } from "@/lib/getMailTransporter";
import { Contact } from "@/types/Contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = (await request.json()) as Contact;

    if (!(checkEmail(email) && checkMessage(message) && checkName(name))) {
      return NextResponse.json(
        { message: "Email, message or name not valid" },
        { status: 400 },
      );
    }

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
