import { z } from "zod";

export const UseResetPasswordSchema = z
  .object({
    password: z.string().min(1, { message: "Required to fill password" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Required to confirm password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const useChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Required to fill password" }),
    newPassword: z.string().min(1, { message: "Required to fill password" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Required to confirm password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
