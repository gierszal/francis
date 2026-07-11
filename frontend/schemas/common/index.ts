import z from "zod";

export const emptyResultToUndefined = <T extends z.ZodType>(schema: T) =>
  z.preprocess(
    (value) => (value === "" || value instanceof FileList ? undefined : value),
    schema.optional(),
  );
