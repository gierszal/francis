import type { FastifyInstance } from "fastify";
import { AIController } from "./ai.controller.js";
import { AIService } from "./ai.service.js";
import { TrackRepository } from "@/repositories/prisma/track.repository.js";
import { UserRepository } from "@/repositories/prisma/user.repository.js";
import {
  aiGenerateQuerySchema,
  aiGenerateResponseSchema,
} from "@/schemas/ai/index.js";
import { authMiddleware, requireRole } from "@/middlewares/auth.middleware.js";
import type { GenerateQueryDTO } from "@/types/ai/index.js";
import { ROLES } from "@/types/auth/auth.roles.js";
import { errorResponseSchema } from "@/schemas/common/error.schema.js";
type optionsType = {
  prefix: string;
};

const aiRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const trackRepository = new TrackRepository();
  const userRepository = new UserRepository();
  const service = new AIService(trackRepository, userRepository);
  const aiController = new AIController(service);

  fastify.post<{
    Body: GenerateQueryDTO;
  }>(
    "/generate",
    {
      schema: {
        tags: ["AI"],
        summary: "Generate query",
        body: aiGenerateQuerySchema,
        response: {
          200: aiGenerateResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [
        authMiddleware,
        requireRole(ROLES.ADMIN.name, ROLES.USER.name),
      ],
    },
    aiController.generate,
  );
};

export default aiRoutes;
