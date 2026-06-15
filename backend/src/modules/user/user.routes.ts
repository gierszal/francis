import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";

import { updateUserSchema } from "../../schemas/user.schema.js";
import { UserRepository } from "@/repositories/prisma/user.repository.js";
import { querySchema } from "@/schemas/common/query.schema.js";
import { addToFavouritesSchema } from "@/schemas/track.schema.js";
import { paramsSchema } from "@/schemas/common/params.schema.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import type { queryType } from "@/types/common/query.js";
import type { addToFavouritesType } from "@/types/track/track.js";
import type { paramsType } from "@/types/common/params.js";
import type { updateUserType } from "@/types/user/user.js";

type optionsType = {
  prefix: string;
};

const userRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const controller = new UserController(userService);

  fastify.get(
    "/me",
    {
      preHandler: authMiddleware,
    },
    controller.getUser,
  );

  fastify.get<{ Querystring: queryType }>(
    "/me/playlists",
    {
      preHandler: [authMiddleware, validate({ query: querySchema })],
    },
    controller.getPlaylists,
  );

  fastify.get<{ Querystring: queryType }>(
    "/me/favourites",
    { preHandler: [authMiddleware, validate({ query: querySchema })] },
    controller.getFavourites,
  );

  fastify.post<{ Params: addToFavouritesType }>(
    "/me/favourites/:trackId",
    {
      preHandler: [authMiddleware, validate({ params: addToFavouritesSchema })],
    },
    controller.addToFavourites,
  );

  fastify.delete<{ Params: paramsType }>(
    "/me/favourites/:id",
    {
      preHandler: [authMiddleware, validate({ params: paramsSchema })],
    },
    controller.removeFromFavourites,
  );

  fastify.post<{ Params: paramsType }>(
    "/me/history/:id",
    {
      preHandler: [authMiddleware, validate({ query: querySchema })],
    },
    controller.addToHistory,
  );

  fastify.get<{ Querystring: queryType }>(
    "/me/history",
    {
      preHandler: [authMiddleware, validate({ query: querySchema })],
    },
    controller.getHistory,
  );

  fastify.patch<{ Body: updateUserType }>(
    "/me",
    { preHandler: [authMiddleware, validate({ body: updateUserSchema })] },
    controller.updateUser,
  );

  fastify.delete("/me", controller.removeUser);
};

export default userRoutes;
