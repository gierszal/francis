import type { addToFavouritesSchema } from "@/schemas/track/track.schema.js";
import {
  createUserSchema,
  updateUserSchema,
} from "@/schemas/user/user.schema.js";
import { z } from "zod";

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type AddToFavoritesDTO = z.infer<typeof addToFavouritesSchema>;
