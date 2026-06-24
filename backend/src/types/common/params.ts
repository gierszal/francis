import { paramsSchema } from "@/schemas/common/params.schema.js";

import { z } from "zod";

export type paramsType = z.infer<typeof paramsSchema>;
