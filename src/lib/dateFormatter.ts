import { format } from "date-fns";

export const dateFormatter = (date?: string) =>
  format(new Date(date!), "MMM d, y");
