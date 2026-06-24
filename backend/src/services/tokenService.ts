import { InvalidTokenError } from "@/errors/ApiError.js";
import type { FormattedUserPayload } from "@/types/user/user.model.js";
import jwt from "jsonwebtoken";

export class TokenService {
  generateTokens(payload: FormattedUserPayload) {
    try {
      const accessToken = jwt.sign(
        { ...payload, expiresIn: "15m" },
        process.env.JWT_ACCESS_SECRET!,
      );
      const refreshToken = jwt.sign(
        { ...payload, expiresIn: "7d" },
        process.env.JWT_REFRESH_SECRET!,
      );
      return {
        accessToken,
        refreshToken,
      };
    } catch (err: any) {
      throw new InvalidTokenError(err.message);
    }
  }

  validateAccessToken(token: string): FormattedUserPayload | null {
    try {
      return jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET!,
      ) as FormattedUserPayload;
    } catch (e) {
      throw new InvalidTokenError("Unable to validate access token!");
    }
  }

  validateRefreshToken(token: string): FormattedUserPayload | null {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
      if (decoded) {
        return decoded as FormattedUserPayload;
      } else throw new InvalidTokenError("Unable to verify tokens!");
    } catch (e) {
      throw new InvalidTokenError("Unable to verify tokens!");
    }
  }
}
