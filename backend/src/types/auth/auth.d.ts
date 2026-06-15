import {
  activationLinkSchema,
  signUpSchema,
  signInSchema,
} from "@/schemas/auth.schema.ts";

import { z } from "zod";

export type activationLinkType = z.infer<typeof activationLinkSchema>;
export type signUpType = z.infer<typeof signUpSchema>;
export type signInType = z.infer<typeof signInSchema>;

export type AuthServiceType = {
  signUp: (data: signUpType) => Promise<any>;
  signIn: (data: signInType) => Promise<any>;
  signOut: (refreshToken: string) => Promise<any>;
  refresh: (refreshToken: string) => Promise<any>;
  activate: (link: activationLinkType) => Promise<any>;
};

export type AuthRepositoryType = {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(data: signUpType & activationLinkType): Promise<User>;
  activateUser(data: activationLinkType): Promise<User>;
  saveRefreshToken(userId: string, refreshToken: string): Promise<void>;
  findRefreshToken(refreshToken: string): Promise<Token | null>;
  removeRefreshToken(refreshToken: string): Promise<{ refreshToken: string }>;
};
