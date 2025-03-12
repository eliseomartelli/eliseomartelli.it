import { z } from "zod";

export const NewsletterEntry = z.object({
  email: z.string().email(),
});

export type NewsletterEntryType = z.infer<typeof NewsletterEntry>;
