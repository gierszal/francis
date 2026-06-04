import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { AuthRepository } from "@/repositories/prisma/auth.repository.js";
import { activationLinkSchema, signUpSchema } from "@/schemas/auth.schema.js";

type optionsType = {
  prefix: string;
};

const authRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const authRepository = new AuthRepository();
  const authService = new AuthService(authRepository);
  const controller = new AuthController(authService);

  fastify.post(
    "/sign-up",
    { preHandler: [validate({ body: signUpSchema })] },
    controller.signUp,
  );

  fastify.post(
    "/sign-in",
    { preHandler: [validate({ body: signUpSchema })] },
    controller.signIn,
  );

  fastify.post("/sign-out", controller.signOut);

  fastify.get("/refresh", controller.refresh);

  fastify.get(
    "/activate/:link",
    {
      preHandler: [validate({ query: activationLinkSchema })],
    },
    controller.activate,
  );
};

export default authRoutes;
