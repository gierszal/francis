import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, "Too short name!"),
  email: z.email("Email is not valid!").max(100, "Too long email"),
  password: z.string().min(1, "Too short password!"),
});

export const signInSchema = z.object({
  email: z.email("Email is not valid!").max(100, "Too long email"),
  password: z.string().min(1, "Too short password!"),
});

export const activationLinkSchema = z.object({
  link: z.uuid("The activation link is not valid!"),
});
