import type { UserPayloadDTO } from "@/DTO/userDTO.js";

export type TokenServiceType = {
  generateTokens(payload: UserPayloadDTO): {
    accessToken: string;
    refreshToken: string;
  };
  validateAccessToken(token: string): UserPayloadDTO | null;
  validateRefreshToken(token: string): UserPayloadDTO | null;
};
