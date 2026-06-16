import type { AIServiceType, generateQueryType } from "@/types/ai/ai.js";
import type { createAlbumType } from "@/types/album/album.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export class AIController {
  constructor(private aiService: AIServiceType) {}

  generate = async (
    request: FastifyRequest<{ Body: generateQueryType }>,
    reply: FastifyReply,
  ) => {
    const { prompt } = request.body;
    if (!prompt) reply.code(400).send("Prompt query is not provided!");
    const answer = await this.aiService.generate(prompt);
    return reply.send({ answer });
  };

  getRecommendations = async (request: FastifyRequest, reply: FastifyReply) => {
    const id = request?.user?.id;
    if (!id) return reply.code(404).send({ message: "User is not defined!" });
    const recommendations = await this.aiService.getRecommendations(id);
    return reply.send({ recommendations });
  };
}
