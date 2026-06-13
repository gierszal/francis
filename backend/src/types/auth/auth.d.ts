import { activationLinkSchema, signUpSchema } from "@/schemas/auth.schema.ts";

import { z } from "zod";

export type activationLinkType = z.infer<typeof activationLinkSchema>;
export type signUpType = z.infer<typeof signUpSchema>;

export type AuthServiceType = {
  signUp: (data: signUpType) => Promise<any>;
  signIn: (data: signUpType) => Promise<any>;
  signOut: (refreshToken: string) => Promise<any>;
  refresh: (refreshToken: string) => Promise<any>;
  activate: (link: activationLinkType["link"]) => Promise<any>;
};
