import { z } from "zod";

export const Contact = z.object({
  message: z.string().min(5),
  name: z.string().min(2),
  email: z.string().email(),
});

export type ContactType = z.infer<typeof Contact>;
