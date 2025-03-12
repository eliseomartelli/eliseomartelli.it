import { PrismaClient, Subscriber } from "@prisma/client";
import { getMailTransporter } from "@/lib/mail-transporter";
import { allSortedNewsletter } from "@/lib/sortedNewsletter";

export class NewsletterService {
  constructor(
    private prisma: PrismaClient,
    private transporter: ReturnType<typeof getMailTransporter>,
    private from: string,
    private to: string = process.env.SMTP_TO!,
  ) {}

  async getSubscriber(uuid: string): Promise<Subscriber | null> {
    return await this.prisma.subscriber.findUnique({
      where: { unsub: uuid },
    });
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return await this.prisma.subscriber.findMany();
  }

  async checkIfSubscriberExists(email: string) {
    const exists = await this.prisma.subscriber.findUnique({
      where: { email },
    });
    if (exists !== null) {
      throw new Error("Email already present");
    }
  }

  async addSubscriber(email: string): Promise<Subscriber> {
    return await this.prisma.subscriber.create({
      data: {
        email: email,
      },
    });
  }

  async removeSubscriber(uuid: string): Promise<void> {
    const subscriber = await this.prisma.subscriber.findUnique({
      where: { unsub: uuid },
    });
    if (subscriber === null) {
      throw new Error("Subscriber not present");
    }
    await this.prisma.subscriber.delete({ where: subscriber });
  }

  async sendWelcomeEmail(subscriber: Subscriber) {
    try {
      await this.transporter.sendMail({
        from: this.from,
        bcc: subscriber.email,
        subject: "Welcome to the newsletter!",
        html: `Hi!<br/>
Welcome to my newsletter. You can <a href="https://eliseomartelli.it/newsletter/unsub/${subscriber.unsub}">unsubscribe</a> in any moment. Here I will share some of the things I'm working on.
<br/>
<br/>
See you soon!<br/>
Eliseo`,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Unable to send email.");
    }
  }

  async testSendLastNewsletterIssue() {
    const subscribers = await this.prisma.subscriber.findFirst({
      where: {
        email: this.to,
      },
    });
    const { title, html } = allSortedNewsletter.at(0)!;
    await this.transporter.sendMail({
      from: this.from,
      to: this.to,
      subject: title,
      html: `${html}
<br />
<a href="https://eliseomartelli.it/newsletter/unsub/${subscribers!.unsub}">unsubscribe</a>`,
    });
  }

  async sendLastNewsletterIssue() {
    const subscribers = await this.getAllSubscribers();
    const { title, html, slug } = allSortedNewsletter.at(0)!;
    const sent = await this.prisma.lastSent.findFirst({
      where: {
        sent: { equals: slug },
      },
    });
    if (sent !== null) {
      throw new Error("Already sent.");
    }
    subscribers.map(async (e) => {
      await this.transporter.sendMail({
        from: this.from,
        to: e.email,
        subject: title,
        html: `${html}
<br />
<a href="https://eliseomartelli.it/newsletter/unsub/${e.unsub}">unsubscribe</a>`,
      });
    });
    await this.prisma.lastSent.create({
      data: {
        sent: slug,
      },
    });
  }

  async subscribe(email: string) {
    await this.checkIfSubscriberExists(email);
    const subscriber = await this.addSubscriber(email);
    await this.sendWelcomeEmail(subscriber);
    return { message: "Subscribed." };
  }
}
