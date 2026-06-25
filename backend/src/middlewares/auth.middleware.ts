import type { FastifyRequest, FastifyReply } from "fastify";
import { TokenService } from "@/services/tokenService.js";
import type { FormattedUserPayload } from "@/types/user/user.model.js";
import { ForbiddenError, InvalidCredentialsError } from "@/errors/ApiError.js";

declare module "fastify" {
  interface FastifyRequest {
    user?: FormattedUserPayload;
  }
}

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const authHeader = req.headers.authorization;
  const { validateAccessToken } = new TokenService();

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new InvalidCredentialsError("Access token is missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = validateAccessToken(token!);
    if (!payload) throw new InvalidCredentialsError("Access token is missing");
    req.user = payload as FormattedUserPayload;
  } catch (err) {
    throw new InvalidCredentialsError("Invalid or expired access token");
  }
};

export const requireRole = (...roleIds: string[]) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    if (!req.user) {
      throw new InvalidCredentialsError("Not authenticated");
    }
    if (!roleIds.includes(req.user.role)) {
      throw new ForbiddenError("Insufficient permissions");
    }
  };
};
