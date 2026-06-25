import type { FormattedUserPayload } from "@/types/user/index.js";
import type { JwtPayload } from "jsonwebtoken";

export type TokenServiceType = {
  generateTokens(payload: JwtPayload): {
    accessToken: string;
    refreshToken: string;
  };
  validateAccessToken(token: string): JwtPayload | null;
  validateRefreshToken(token: string): JwtPayload | null;
};
