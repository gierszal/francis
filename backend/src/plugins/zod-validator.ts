import { string, ZodError } from "zod";
import { ValidationError } from "../errors/index.js";
import { z } from "zod";

type errorType = {
  errors: string[];
  properties?: string[];
};

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
