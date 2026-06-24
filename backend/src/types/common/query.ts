import { querySchema } from "@/schemas/common/query.schema.js";

import { z } from "zod";

export type queryType = z.infer<typeof querySchema>;
