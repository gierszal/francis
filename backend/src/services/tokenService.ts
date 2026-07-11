import { InvalidTokenError } from "@/errors/ApiError.js";
import type { TokenServiceType } from "@/types/services/tokenService.js";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const validateMode = {
  strict: "strict",
  soft: "soft",
} as const;

export class TokenService implements TokenServiceType {
  generateTokens(payload: JwtPayload) {
    try {
      const { iat, exp, nbf, ...data } = payload;
      const accessToken = jwt.sign(
        { ...data },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" },
      );
      const refreshToken = jwt.sign(
        { ...data },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" },
      );
      return {
        accessToken,
        refreshToken,
      };
    } catch (err: any) {
      throw new InvalidTokenError(err.message);
    }
  }

  validateAccessToken(
    token: string,
    mode: string = validateMode.strict,
  ): JwtPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload;
    } catch (e) {
      if (mode === validateMode.strict)
        throw new InvalidTokenError("Unable to validate access token!");
      return null;
    }
  }

  validateRefreshToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
      if (decoded) {
        return decoded as JwtPayload;
      } else throw new InvalidTokenError("Unable to verify tokens!");
    } catch (e) {
      throw new InvalidTokenError("Unable to verify tokens!");
    }
  }
}
