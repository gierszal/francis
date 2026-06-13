import type { FastifyReply, FastifyRequest } from "fastify";
import {
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  ValidationError,
} from "./index.js";

export function errorHandler(
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof NotFoundError) {
    return reply.status(404).send({ error: error.message });
  }
  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({ error: error.message });
  }
  if (error instanceof ValidationError) {
    return reply.status(400).send({ error: error.message });
  }
  if (error instanceof ConflictError) {
    return reply.status(409).send({ error: error.message });
  }
  return reply.status(500).send({ error: "Internal Server Error" });
}
