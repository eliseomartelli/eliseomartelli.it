import { NewsletterEntryType } from "@/types/newsletterentry";
import { BaseService } from "./BaseClient";

export class NewsletterClient extends BaseService {
  constructor(private baseApiRoute: string = "/api/newsletter/") {
    super();
  }

  async subscribe(user: NewsletterEntryType): Promise<void> {
    await this.handleRequest(`${this.baseApiRoute}/subscribe/`, {
      method: "POST",
      body: JSON.stringify(user),
    });
  }

  async unsubscribe(uuid: string): Promise<void> {
    await this.handleRequest(`${this.baseApiRoute}/unsubscribe/${uuid}`, {
      method: "DELETE",
    });
  }
}
