import { z } from "zod";

export const SignUpSchema = z
  .object({
    firstName: z.string().min(2, "Min 1 chars"),
    lastName: z.string().optional(),
    email: z.email("Incorrect email"),
    password: z
      .string()
      .min(8, "Min 8 chars")
      .regex(/[A-Z]/, "Capital letter is required.")
      .regex(/[0-9]/, "At least one number is reqired."),
    confirmPassword: z.string(),
    agree: z.boolean().refine((v) => v === true, "Accept the conditions."),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof SignUpSchema>;
