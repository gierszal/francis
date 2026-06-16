import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { AIController } from "./ai.controller.js";
import { AIService } from "./ai.service.js";
import { TrackRepository } from "@/repositories/prisma/track.repository.js";
import { UserRepository } from "@/repositories/prisma/user.repository.js";
import { generateQuerySchema } from "@/schemas/ai.schema.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import type { generateQueryType } from "@/types/ai/ai.js";

type optionsType = {
  prefix: string;
};

const aiRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const trackRepository = new TrackRepository();
  const userRepository = new UserRepository();
  const service = new AIService(trackRepository, userRepository);
  const aiController = new AIController(service);

  fastify.post<{
    Body: generateQueryType;
  }>(
    "/generate",
    {
      preHandler: [authMiddleware, validate({ body: generateQuerySchema })],
    },
    aiController.generate,
  );

  fastify.post(
    "/recommendations",
    {
      preHandler: [authMiddleware],
    },
    aiController.getRecommendations,
  );
};

export default aiRoutes;
