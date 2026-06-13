import { z } from "zod";

export const signUpSchema = z.object({
  email: z.email("Email is not valid!").max(100, "Too long email"),
  password: z.string().min(1, "Too short password!"),
});

export const signInSchema = signUpSchema; // мб еще поменяется

export const activationLinkSchema = z.object({
  link: z.uuid("The activation link is not valid!"),
});
