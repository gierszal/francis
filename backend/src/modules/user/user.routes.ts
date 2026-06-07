import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";

import { updateUserSchema } from "../../schemas/user.schema.js";
import { UserRepository } from "@/repositories/prisma/user.repository.js";
import { querySchema } from "@/schemas/common/query.schema.js";
import { addToFavouritesSchema } from "@/schemas/track.schema.js";
import { paramsSchema } from "@/schemas/common/params.schema.js";

type optionsType = {
  prefix: string;
};

const userRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const controller = new UserController(userService);

  fastify.get("/me", controller.getUser);

  fastify.get(
    "/me/playlists",
    {
      preHandler: [validate({ query: querySchema })],
    },
    controller.getPlaylists,
  );

  fastify.get(
    "/me/favourites",
    { preHandler: [validate({ query: querySchema })] },
    controller.getFavourites,
  );

  fastify.post(
    "/me/favourites",
    {
      preHandler: [validate({ body: addToFavouritesSchema })],
    },
    controller.addToFavourites,
  );

  fastify.delete(
    "/me/favourites/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    controller.removeFromFavourites,
  );

  fastify.get(
    "/me/history",
    {
      preHandler: [validate({ query: querySchema })],
    },
    controller.getHistory,
  );

  fastify.patch(
    "/me",
    { preHandler: [validate({ body: updateUserSchema })] },
    controller.updateUser,
  );

  fastify.delete("/me", controller.removeUser);
};

export default userRoutes;
