import { allSortedNewsletters } from "@/lib/data/allSortedNewsletters";
import { getMailTransporter } from "@/lib/getMailTransporter";
import { NextResponse } from "next/server";

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

  const transporter = getMailTransporter();
  const { NEWSLETTER_FROM: from, SMTP_TO: to } = process.env;

  await transporter.sendMail({
    from,
    to,
    subject: newsletter.title,
    html: `${newsletter.body.html}
<br />
<a href="https://eliseomartelli.it/api/newsletter/unsubscribe/${to}">unsubscribe (not working)</a>`,
  });

  return NextResponse.json({ message: "Sent." }, { status: 200 });
}
