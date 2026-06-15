import type { FastifyRequest, FastifyReply } from "fastify";
import { TokenService } from "@/services/tokenService.js";
import type { UserPayloadDTO } from "@/DTO/userDTO.js";

declare module "fastify" {
  interface FastifyRequest {
    user?: UserPayloadDTO;
  }
}

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const authHeader = req.headers.authorization;
  const { validateAccessToken } = new TokenService();

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply.code(401).send({ error: "Access token is missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = validateAccessToken(token!);
    if (!payload) reply.code(401).send({ error: "Access token is missing" });
    req.user = payload as UserPayloadDTO;
  } catch (err) {
    return reply.code(401).send({ error: "Invalid or expired access token" });
  }
};

export const requireRole = (...roleIds: string[]) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    if (!req.user) {
      return reply.code(401).send({ error: "Not authenticated" });
    }

    if (!roleIds.includes(req.user.roleId)) {
      return reply.code(403).send({ error: "Insufficient permissions" });
    }
  };
};
