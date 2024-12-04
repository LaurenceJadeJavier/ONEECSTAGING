import { z } from "zod";

export const UseCreateSOASchema = z.object({
  accountNo: z.string().min(1, { message: "Required to fill this input" }),
});
