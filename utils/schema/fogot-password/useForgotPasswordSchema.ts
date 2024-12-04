import { z } from "zod";

export const useForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
});
