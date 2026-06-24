import type { FormattedUserPayload } from "@/types/user/index.js";

export type TokenServiceType = {
  generateTokens(payload: FormattedUserPayload): {
    accessToken: string;
    refreshToken: string;
  };
  validateAccessToken(token: string): FormattedUserPayload | null;
  validateRefreshToken(token: string): FormattedUserPayload | null;
};
