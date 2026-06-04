import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthService } from "./auth.service.js";
import type { activationLinkType, signUpType } from "@/types/auth/auth.js";

export class AuthController {
  constructor(private authService: AuthService) {}
  signUp = async (
    request: FastifyRequest<{ Body: signUpType }>,
    reply: FastifyReply,
  ) => {
    const result = await this.authService.signUp(request.body);

    return reply.code(201).send(result);
  };

  signIn = async (
    request: FastifyRequest<{ Body: signUpType }>,
    reply: FastifyReply,
  ) => {
    const result = await this.authService.signIn(request.body);

    return reply.send(result);
  };

  signOut = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.authService.signOut();

    return reply.send(result);
  };

  refresh = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.authService.refresh();

    return reply.send(result);
  };

  activate = async (
    request: FastifyRequest<{ Params: activationLinkType }>,
    reply: FastifyReply,
  ) => {
    const result = await this.authService.activate(request.params.link);

    return reply.send(result);
  };
}
