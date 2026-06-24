import { string, ZodError } from "zod";
import { ValidationError, type errorType } from "../errors/ApiError.js";
import { z } from "zod";

const validate = (schemas: Record<string, z.ZodObject | undefined>) => {
  return async (request: any) => {
    for (const [target, schema] of Object.entries(schemas)) {
      if (!schema) continue;
      try {
        request[target] = schema.parse(request[target]);
      } catch (e) {
        if (e instanceof ZodError) {
          const formattedError: errorType = z.treeifyError(e);
          throw new ValidationError("Validation failed", formattedError);
        }
        throw e;
      }
    }
  };
};

export default validate;
