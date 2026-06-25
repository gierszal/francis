import type { FormattedUserPayload } from "../user/user.model.js";

export type RefreshTokenResponse = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken: string;
  userId: string;
};

export type AuthResult = {
  user: FormattedUserPayload;
  tokens: TokenPair;
};

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};
