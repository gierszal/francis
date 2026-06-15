import { UserPayloadDTO } from "@/DTO/userDTO.js";
import { InvalidTokenError } from "@/errors/index.js";
import jwt from "jsonwebtoken";

export class TokenService {
  generateTokens(payload: UserPayloadDTO) {
    try {
      const accessToken = jwt.sign(
        { ...payload },
        process.env.JWT_ACCESS_SECRET!,
        {
          expiresIn: "15m",
        },
      );
      const refreshToken = jwt.sign(
        { ...payload },
        process.env.JWT_REFRESH_SECRET!,
        {
          expiresIn: "7d",
        },
      );
      return {
        accessToken,
        refreshToken,
      };
    } catch (err: any) {
      throw new InvalidTokenError(err.message);
    }
  }

  validateAccessToken(token: string): UserPayloadDTO | null {
    try {
      return jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET!,
      ) as UserPayloadDTO;
    } catch (e) {
      throw new InvalidTokenError("Unable to validate access token!");
    }
  }

  validateRefreshToken(token: string): UserPayloadDTO | null {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
      if (decoded) {
        const userPayload = new UserPayloadDTO(decoded as any);
        console.log("!!!!");

        console.log(decoded);
        console.log(userPayload);
        return userPayload;
      } else throw new InvalidTokenError("Unable to verify tokens!");
    } catch (e) {
      throw new InvalidTokenError("Unable to verify tokens!");
    }
  }
}
