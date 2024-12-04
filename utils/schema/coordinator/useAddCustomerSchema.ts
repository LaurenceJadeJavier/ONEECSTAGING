import { z } from "zod";

export const useAddCustomerSchema = z.object({
  first_name: z.string().min(1, { message: "Require to fill this input" }),
  middle_name: z.string().min(1, { message: "Require to fill this input" }),
  last_name: z.string().min(1, { message: "Require to fill this input" }),
  gender: z.string({
    required_error: "Please select an gender to display.",
  }),
  email: z.string().email({ message: "Invalid Email" }),
  contact_number: z
    .string()
    .regex(/^(09\d{9}|\+63\d{10})$/, { message: "invalid phone number" }),
  address: z.string().min(1, { message: "Require to fill this input" }),
  birthdate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Invalid date format for 'birthdate'. Expected format: YYYY-MM-DD"
    )
    .transform((val) => new Date(val))
    .optional(),
});

export const useAddMeterAccountSchema = z.object({
  meterNumber: z.number().min(1, "Meter number must be valid"),
  meterAccountName: z.string().optional(),
  meterAddress: z.string().optional(),
  customerType: z.string().optional(),
  meterActivated: z.boolean().optional(),
});

export const combinedSchema = z.object({
  userData: useAddCustomerSchema,
  meterData: useAddMeterAccountSchema,
});
