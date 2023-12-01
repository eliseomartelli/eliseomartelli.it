import { allNewsletters } from "@/.contentlayer/generated";
import { getMailTransporter } from "@/lib/getMailTransporter";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const newsletter = allNewsletters
    .sort((a, b) => {
      if (a._id < b._id) {
        return -1;
      }
      if (a._id > b._id) {
        return 1;
      }
      return 0;
    })
    .at(-1);
  if (!newsletter || newsletter == undefined) {
    return NextResponse.json({ message: "No newsletters." }, { status: 200 });
  }

  const transporter = getMailTransporter();
  const { NEWSLETTER_FROM: from, SMTP_TO: to } = process.env;

  await transporter.sendMail({
    from,
    to,
    subject: newsletter.title,
    html: `${newsletter.body.html}
<br />
<a href="https://eliseomartelli.it/api/newsletter/unsubscribe/${to}">unsubscribe</a>`,
  });

  return NextResponse.json({ message: "Sent." }, { status: 200 });
}
