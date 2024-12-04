import { z } from "zod";

export const useAddUserSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: "Required to fill this input" })
    .max(255),
  middle_name: z
    .string()
    .min(1, { message: "Required to fill this input" })
    .max(255),
  last_name: z
    .string()
    .min(1, { message: "Required to fill this input" })
    .max(255),
  email: z.string().email({ message: "Invalid Email" }).optional(),
  contact_number: z
    .string()
    .regex(/^(09\d{9}|\+63\d{10})$/, { message: "invalid phone number" }),
  address: z
    .string()
    .min(1, { message: "Required to fill this input" })
    .max(255),
});

export const userRole = z.object({
  roleIds: z.array(z.number()).min(1, "At least one role is required"),
});
export const combinedSchema = useAddUserSchema.merge(userRole);

export const useEditUserSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: "Required to fill this input" })
    .max(255),
  middle_name: z
    .string()
    .min(1, { message: "Required to fill this input" })
    .max(255),
  last_name: z
    .string()
    .min(1, { message: "Required to fill this input" })
    .max(255),

  contact_number: z
    .string()
    .regex(/^(09\d{9}|\+63\d{10})$/, { message: "invalid phone number" }),
  address: z
    .string()
    .min(1, { message: "Required to fill this input" })
    .max(255),
});

export const userUpdateRole = z.object({
  roleIds: z.array(z.number()).min(1, "At least one role is required"),
});
export const combinedUpdateSchema = useEditUserSchema.merge(userUpdateRole);
