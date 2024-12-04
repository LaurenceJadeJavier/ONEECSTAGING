import { z } from "zod";

export const useCreateBillSchema = z.object({
  fromDate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Invalid date format for 'fromDate'. Expected format: YYYY-MM-DD"
    ),
  toDate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Invalid date format for 'toDate'. Expected format: YYYY-MM-DD"
    ),
  dueDate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Invalid date format for 'dueDate'. Expected format: YYYY-MM-DD"
    ),
  nextDate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Invalid date format for 'nextDate'. Expected format: YYYY-MM-DD"
    ),
  billDate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Invalid date format for 'billDate'. Expected format: YYYY-MM-DD"
    ),
  readingDate: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Invalid date format for 'readingDate'. Expected format: YYYY-MM-DD"
    ),
  kwhConsume: z.number().positive("kWh consumption must be a positive number"),
  rate: z.number().positive("Rate must be a positive number"),
  distribution: z.number().default(0),
  generation: z.number().default(0),
  sLoss: z.number().default(0),
  transmission: z.number().default(0),
  subsidies: z.number().default(0),
  gTax: z.number().default(0),
  fitAll: z.number().default(0),
  applied: z.number().default(0),
  other: z.number().default(0),
  uCharges: z.number().default(0),
});
