import { SignInSchema, SignUpSchema } from "@/schemas/auth";
import { FormattedUserPayload } from "../user";
import z from "zod";

export type AuthResult = {
  user: FormattedUserPayload;
  tokens: TokenPair;
};

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshResponse = {
  data: TokenPair;
};

export type SignUpDTO = z.infer<typeof SignUpSchema>;
export type SignInDTO = z.infer<typeof SignInSchema>;
