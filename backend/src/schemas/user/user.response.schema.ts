import { ROLES } from "@/types/auth/auth.roles.js";
import z from "zod";

const userSchema = z.object({
  id: z.uuid(),
  first_name: z.string(),
  last_name: z.string().nullable(),
  email: z.email(),
  is_activated: z.boolean(),
  role: z.enum([ROLES.ADMIN.name, ROLES.USER.name]),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const userResponseSchema = z.object({
  data: userSchema,
});
