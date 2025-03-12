import { z } from "zod";

export const Feedback = z.object({
  message: z.string().min(5),
});

export type FeedbackType = z.infer<typeof Feedback>;
