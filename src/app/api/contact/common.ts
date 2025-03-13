import { getMailTransporter } from "@/lib/mail-transporter";
import { ContactService } from "@/lib/server/ContactService";

const transporter = getMailTransporter();
const { SMTP_FROM: from, SMTP_TO: to } = process.env;

export const contactService = new ContactService(transporter, to!, from!);
