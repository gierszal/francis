import { uuid, z } from "zod";
export const paramsSchema = z.object({
  id: uuid("ID is not valid!"),
});
