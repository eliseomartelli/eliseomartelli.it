import { getMailTransporter } from "@/lib/mail-transporter";
import { FeedbackType } from "@/types/feedback";
import { ContactType } from "@/types/contact";

export class ContactService {
  constructor(
    private transporter: ReturnType<typeof getMailTransporter>,
    private to: string = process.env.SMTP_TO!,
    private feedbackFrom: string = process.env.SMTP_FROM!,
  ) {}

  async sendFeedback({ message }: FeedbackType) {
    try {
      await this.transporter.sendMail({
        from: this.feedbackFrom,
        to: this.to,
        subject: "Received new feedback",
        text: `You received new feedback:

${message}`,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Unable to send email.");
    }
  }

  async sendContact({ message, email: sender, name }: ContactType) {
    try {
      await this.transporter.sendMail({
        from: this.feedbackFrom,
        to: this.to,
        replyTo: sender,
        subject: `New message from ${name}`,
        text: `Sender: ${name} - ${sender}

${message}`,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Unable to send email.");
    }
  }
}
