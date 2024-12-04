import { z } from "zod";

export const UseLoginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(1, { message: "Required to fill password" }),
});
