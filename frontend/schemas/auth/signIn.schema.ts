import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email("Incorrect email"),
  password: z.string().min(1, "Min 1 chars"),
});

export type SignInFormData = z.infer<typeof SignInSchema>;
