import type { FastifyInstance } from "fastify";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { AuthRepository } from "@/repositories/prisma/auth.repository.js";
import {
  activationLinkSchema,
  signInSchema,
  signUpSchema,
} from "@/schemas/auth/auth.schema.js";
import { TokenService } from "@/services/tokenService.js";
import { MailService } from "@/services/mailService.js";
import {
  refreshResponseSchema,
  signInResponseSchema,
  signUpResponseSchema,
} from "@/schemas/auth/index.js";
import { errorResponseSchema } from "@/schemas/common/error.schema.js";
import { emptyResponseSchema } from "@/schemas/common/empty.response.schema.js";
import { userResponseSchema } from "@/schemas/user/user.response.schema.js";

type optionsType = {
  prefix: string;
};

const authRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const authRepository = new AuthRepository();
  const tokenService = new TokenService();
  const mailService = new MailService();
  const authService = new AuthService(
    authRepository,
    tokenService,
    mailService,
  );
  const authController = new AuthController(authService);

  fastify.post(
    "/sign-up",
    {
      schema: {
        description: "User registration route",
        tags: ["Auth"],
        body: signUpSchema,
        response: {
          201: signUpResponseSchema,
          400: errorResponseSchema,
          409: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
    },
    authController.signUp,
  );

  fastify.post(
    "/sign-in",
    {
      schema: {
        description: "User log-in route",
        tags: ["Auth"],
        body: signInSchema,
        response: {
          201: signInResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
    },
    authController.signIn,
  );

  fastify.post(
    "/sign-out",
    {
      schema: {
        description: "Invalidate the current refresh token (logout)",
        tags: ["Auth"],
        response: {
          204: emptyResponseSchema,
          401: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
    },
    authController.signOut,
  );

  fastify.get(
    "/refresh",
    {
      schema: {
        description:
          "Refresh the access token using a valid refresh token (sent in Authorization header)",
        tags: ["Auth"],
        // response: {
        //   201: ,
        //   401: errorResponseSchema,
        //   403: errorResponseSchema,
        //   500: errorResponseSchema,
        //   default: errorResponseSchema,
        // },
        security: [{ bearerAuth: [] }],
      },
    },
    authController.refresh,
  );

  fastify.get(
    "/activate/:link",
    {
      schema: {
        description: "User log-out route",
        tags: ["Auth"],
        params: activationLinkSchema,
        response: {
          204: emptyResponseSchema,
          401: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
    },
    authController.activate,
  );
};

export default authRoutes;
