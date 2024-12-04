import { z } from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const useAddRoleSchema = z.object({
  name: z.string().min(1, { message: "Required to fill this input" }),
  modules: z
    .array(optionSchema)
    .min(1, { message: "Required to fill this input" }),
  permissions: z
    .array(optionSchema)
    .min(1, { message: "Required to fill this input" }),
});

export const useUpdateRoleSchema = z.object({
  name: z.string().min(1, { message: "Required to fill this input" }),
  modules: z
    .array(optionSchema)
    .min(1, { message: "Required to fill this input" }),
  permissions: z
    .array(optionSchema)
    .min(1, { message: "Required to fill this input" }),
});
