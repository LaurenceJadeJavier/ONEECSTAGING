import { z } from "zod";

export const useAddCoopAccountsSchema = z.object({
  name: z.string().min(1, { message: "require to fill this input" }).max(255),
  address: z
    .string()
    .min(1, { message: "require to fill this input" })
    .max(255),
  description: z
    .string()
    .min(1, { message: "require to fill this input" })
    .max(255),
  coordinator: z.object({
    email: z.string().email({ message: "Invalid Coordinator Email" }),
    contact_number: z.string().regex(/^(09\d{9}|\+63\d{10})$/, {
      message: "Invalid Coordinator Phone Number",
    }),
  }),
});

export const useUpdateCoopAccountsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  address: z.string().min(1, "Invalid  address"),
});
