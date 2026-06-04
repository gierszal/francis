import { paramsSchema } from "@/schemas/common/params.schema.ts";

import { z } from "zod";

export type paramsType = z.infer<typeof paramsSchema>;
