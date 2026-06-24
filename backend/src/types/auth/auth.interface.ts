import type { User } from "@/generated/prisma/client.js";
import type {
  ActivationLinkDTO,
  AuthResult,
  RefreshTokenResponse,
  SignInDTO,
  SignUpDTO,
} from "./index.js";
import type { FormattedUser } from "../user/user.model.js";

export type IAuthService = {
  signUp(data: SignUpDTO): Promise<AuthResult>;
  signIn(data: SignInDTO): Promise<AuthResult>;
  signOut(refreshToken: string): Promise<void>;
  refresh(refreshToken: string): Promise<Pick<AuthResult, "tokens">["tokens"]>;
  activate(link: ActivationLinkDTO): Promise<FormattedUser>;
};

export type IAuthRepository = {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(data: SignUpDTO & { link: string }): Promise<User>;
  activateUser(data: ActivationLinkDTO): Promise<User>;
  saveRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<RefreshTokenResponse>;
  findRefreshToken(refreshToken: string): Promise<RefreshTokenResponse | null>;
  removeRefreshToken(refreshToken: string): Promise<void>;
};
