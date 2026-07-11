import { TokenService, validateMode } from "@/services/tokenService.js";
import type { FormattedUserPayload } from "@/types/user/user.model.js";
import type { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user?: FormattedUserPayload;
  }
}

export const softAuthMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const authHeader = req.headers.authorization;
  const { validateAccessToken } = new TokenService();

  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];

  try {
    if (!token) return;
    const payload = validateAccessToken(token, validateMode.soft);
    if (!payload) return;
    req.user = payload as FormattedUserPayload;
  } catch (err) {
    console.log(err);
  }
};
