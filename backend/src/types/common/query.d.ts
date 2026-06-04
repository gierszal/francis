import { querySchema } from "@/schemas/common/query.schema.ts";

import { z } from "zod";

export type queryType = z.infer<typeof querySchema>;
