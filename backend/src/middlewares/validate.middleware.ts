import { z, ZodError } from "zod";
import type { FastifyRequest } from "fastify";
import { BadRequestError } from "../errors/ApiError.js";

export function validatePart(schemas: Record<string, z.ZodType | undefined>) {
  return async (request: FastifyRequest) => {
    for (const [target, schema] of Object.entries(schemas)) {
      if (!schema) {
        continue;
      }
      const result = schema.safeParse(request[target as keyof FastifyRequest]);
      if (!result.success) {
        const flattened = z.flattenError(result.error);
        throw new BadRequestError("Validation failed", {
          errors: flattened.formErrors,
          properties: Object.keys(flattened.fieldErrors),
        });
      }
    }
  };
}
