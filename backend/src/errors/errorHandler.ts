import type { FastifyReply, FastifyRequest } from "fastify";
import {
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  ValidationError,
  EmailConfigError,
  EmailSendingError,
  InvalidCredentialsError,
  InvalidTokenError,
  DatabaseError,
  FileServiceError,
} from "./index.js";

export function errorHandler(
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof NotFoundError) {
    return reply
      .status(404)
      .send({ error: error.message, details: error.details });
  }
  if (error instanceof UnauthorizedError) {
    return reply
      .status(401)
      .send({ error: error.message, details: error.details });
  }
  if (error instanceof InvalidCredentialsError) {
    return reply
      .status(401)
      .send({ error: error.message, details: error.details });
  }
  if (error instanceof EmailConfigError) {
    return reply
      .status(500)
      .send({ error: error.message, details: error.details });
  }
  if (error instanceof EmailSendingError) {
    return reply
      .status(500)
      .send({ error: error.message, details: error.details });
  }
  if (error instanceof ValidationError) {
    return reply
      .status(400)
      .send({ error: error.message, details: error.details });
  }
  if (error instanceof InvalidTokenError) {
    return reply
      .status(401)
      .send({ error: error.message, details: error.details });
  }
  if (error instanceof ConflictError) {
    return reply
      .status(409)
      .send({ error: error.message, details: error.details });
  }
  if (error instanceof DatabaseError) {
    return reply
      .status(500)
      .send({ error: error.message, details: error.details });
  }
  if (error instanceof FileServiceError) {
    return reply
      .status(500)
      .send({ error: error.message, details: error.details });
  }
  return reply.status(500).send({ error: "Internal Server Error" });
}
