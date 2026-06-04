import { uuid, z } from "zod";
export const uuidParamsSchema = z.object({
  id: uuid("ID is not valid!"),
});
