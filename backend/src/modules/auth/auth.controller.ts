import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthService } from "./auth.service.js";
import type { activationLinkType, signUpType } from "@/types/auth/auth.js";

export class AuthController {
  constructor(private authService: AuthService) {}
  signUp = async (
    request: FastifyRequest<{ Body: signUpType }>,
    reply: FastifyReply,
  ) => {
    try {
      const result = await this.authService.signUp(request.body);
      // reply.setCookie("refreshToken", result.refreshToken, {
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   httpOnly: true,
      //   secure: false,
      //   path: "/",
      // });
      return reply.code(201).send(result);
    } catch (err: any) {
      if (err.message?.includes("unauthorized")) {
        return reply.status(401).send({
          error: "Unauthorized access",
          message: err.message,
        });
      }
      throw err;
    }
  };

  signIn = async (
    request: FastifyRequest<{ Body: signUpType }>,
    reply: FastifyReply,
  ) => {
    try {
      const result = await this.authService.signIn(request.body);
      // reply.setCookie("refreshToken", result.refreshToken, {
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   httpOnly: true,
      //   secure: false,
      //   path: "/",
      // });
      return reply.code(201).send(result);
    } catch (err: any) {
      if (err.message?.includes("unauthorized")) {
        return reply.status(401).send({
          error: "Unauthorized access",
          message: err.message,
        });
      }
      throw err;
    }
  };

  signOut = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { refreshToken } = request.cookies;
      // const token = await this.authService.signOut(refreshToken);
      reply.clearCookie("refreshToken");
      // return reply.send({ token });
    } catch (err: any) {
      if (err.message?.includes("unauthorized")) {
        return reply.status(401).send({
          error: "Unauthorized access",
          message: err.message,
        });
      }
      throw err;
    }
  };

  refresh = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { refreshToken } = request.cookies;
      // const result = await this.authService.refresh(refreshToken);
      // reply.setCookie("refreshToken", refreshToken, {
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   httpOnly: true,
      //   secure: false,
      //   path: "/",
      // });
      // return reply.code(201).send(result);
    } catch (err) {
      throw err;
    }
  };

  activate = async (
    request: FastifyRequest<{ Params: activationLinkType }>,
    reply: FastifyReply,
  ) => {
    try {
      const { link } = request.params;
      await this.authService.activate(link);
      return reply.redirect(process.env.CLIENT_URL!);
    } catch (err: any) {
      throw err;
    }
  };
}
