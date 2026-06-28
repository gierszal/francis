import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email("Incorrect email"),
  password: z
    .string()
    .min(8, "Min 8 chars")
    .regex(/[A-Z]/, "Capital letter is required.")
    .regex(/[0-9]/, "At least one number is reqired."),
});

export type SignInFormData = z.infer<typeof SignInSchema>;
