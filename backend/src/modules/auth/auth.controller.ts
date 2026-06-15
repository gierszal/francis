import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthService } from "./auth.service.js";
import type { activationLinkType, signUpType } from "@/types/auth/auth.js";
import { InvalidCredentialsError } from "@/errors/index.js";

export class AuthController {
  constructor(private authService: AuthService) {}
  signUp = async (
    request: FastifyRequest<{ Body: signUpType }>,
    reply: FastifyReply,
  ) => {
    const { tokens, user } = await this.authService.signUp(request.body);
    reply.setCookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      path: "/",
    });
    return reply.code(201).send({ tokens, user });
  };

  signIn = async (
    request: FastifyRequest<{ Body: signUpType }>,
    reply: FastifyReply,
  ) => {
    const { tokens, user } = await this.authService.signIn(request.body);
    reply.setCookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      path: "/",
    });
    return reply.code(201).send({ tokens, user });
  };

  signOut = async (request: FastifyRequest, reply: FastifyReply) => {
    const { refreshToken } = request.cookies;
    if (!refreshToken)
      throw new InvalidCredentialsError("Refresh token is not provided!");
    await this.authService.signOut(refreshToken);
    reply.clearCookie("refreshToken");
    return reply.send({ refreshToken });
  };

  refresh = async (request: FastifyRequest, reply: FastifyReply) => {
    const { refreshToken } = request.cookies;
    if (!refreshToken)
      throw new InvalidCredentialsError("Refresh token is not provided!");

    const tokens = await this.authService.refresh(refreshToken);
    reply.setCookie("refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      path: "/",
    });
    return reply.code(201).send(tokens);
  };

  activate = async (
    request: FastifyRequest<{ Params: activationLinkType }>,
    reply: FastifyReply,
  ) => {
    const data = request.params;
    await this.authService.activate(data);
    return reply.redirect(process.env.CLIENT_URL!);
  };
}
