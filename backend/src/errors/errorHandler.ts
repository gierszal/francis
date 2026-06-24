import { type FastifyReply, type FastifyRequest } from "fastify";
import {
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  InvalidCredentialsError,
  InvalidTokenError,
  BadRequestError,
  ForbiddenError,
} from "./ApiError.js";

import z from "zod";

import {
  DatabaseError,
  EmailServiceError,
  FileServiceError,
  LLMApplicationError,
} from "./InfrastructureError.js";
import { ZodError } from "zod";

const errorStatusMap = new Map<Function, number>([
  [NotFoundError, 404],
  [UnauthorizedError, 401],
  [InvalidCredentialsError, 401],
  [InvalidTokenError, 401],
  [ConflictError, 409],
  [BadRequestError, 400],
  [ForbiddenError, 403],

  [DatabaseError, 500],
  [EmailServiceError, 500],
  [FileServiceError, 500],
  [LLMApplicationError, 500],
]);

function resolveStatus(err: unknown) {
  for (const [error, status] of errorStatusMap) {
    if (err instanceof error) return status;
  }
  if (
    typeof err === "object" &&
    err !== null &&
    "statusCode" in err &&
    typeof err.statusCode === "number"
  )
    return err.statusCode;
  return 500;
}

export function errorHandler(
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.log.error(
    {
      err: error,
      url: request.raw.url,
      method: request.raw.method,
    },
    "An error occured!",
  );

  let status = resolveStatus(error);
  const payload: Record<string, unknown> = {
    message: error.message,
  };

  if ("validation" in error && error.validation) {
    status = 400;
    payload.details = error instanceof ZodError ? z.flattenError(error) : error;
  }

  if (process.env.NODE_ENV !== "development" && "details" in error)
    payload.details = error.details;

  reply.status(status).send({ error: payload });
}
