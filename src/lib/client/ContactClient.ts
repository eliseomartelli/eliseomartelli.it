import { FeedbackType } from "@/types/feedback";
import { BaseService } from "./BaseClient";
import { ContactType } from "@/types/contact";

export class ContactClient extends BaseService {
  constructor(private baseApiRoute: string = "/api/contact/") {
    super();
  }

  async sendFeedback(feedback: FeedbackType): Promise<void> {
    await this.handleRequest(`${this.baseApiRoute}/feedback/`, {
      method: "POST",
      body: JSON.stringify(feedback),
    });
  }

  async sendContact(contact: ContactType): Promise<void> {
    await this.handleRequest(this.baseApiRoute, {
      method: "POST",
      body: JSON.stringify(contact),
    });
  }
}
