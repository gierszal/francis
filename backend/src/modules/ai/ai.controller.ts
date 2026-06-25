import { BadRequestError } from "@/errors/ApiError.js";
import type { IAIService, GenerateQueryDTO } from "@/types/ai/index.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export class AIController {
  constructor(private aiService: IAIService) {}

  generate = async (
    request: FastifyRequest<{ Body: GenerateQueryDTO }>,
    reply: FastifyReply,
  ) => {
    const { prompt } = request.body;
    if (!prompt) reply.code(400).send("Prompt query is not provided!");
    const answer = await this.aiService.generate(prompt);
    return reply.send({ data: answer });
  };
}
