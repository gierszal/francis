import { createUserSchema, updateUserSchema } from "@/schemas/user.schema.ts";

import { z } from "zod";

export type createUserType = z.infer<typeof createUserSchema>;
export type updateUserType = z.infer<typeof updateUserSchema>;

export type UserServiceType = {
  getUser: (userId: string) => Promise<any>;

  getPlaylists: (userId: string, query: queryType) => Promise<any>;

  getFavourites: (userId: string, query: queryType) => Promise<any>;

  addToFavourites: (userId: string, trackId: string) => Promise<any>;

  removeFromFavourites: (userId: string, trackId: string) => Promise<any>;

  getHistory: (userId: string, query: queryType) => Promise<any>;

  updateUser: (userId: string, data: updateUserType) => Promise<any>;

  removeUser: (userId: string) => Promise<any>;
};
