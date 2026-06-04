import fastify from "fastify";
import "dotenv/config";
import fastifyMultipart from "@fastify/multipart";
import trackRoutes from "./modules/track/track.routes.js";
import cors from "@fastify/cors";
import { ApiError } from "./errors/index.js";
import { ZodError } from "zod";
import albumRoutes from "./modules/album/album.routes.js";
import playlistRoutes from "./modules/playlist/playlist.routes.js";
import collectionRoutes from "./modules/collection/collection.routes.js";

const server = fastify({ logger: { level: "info" } });

server.register(fastifyMultipart);
server.register(trackRoutes, { prefix: "/api/tracks" });
server.register(albumRoutes, { prefix: "/api/albums" });
server.register(playlistRoutes, { prefix: "/api/playlists" });
server.register(collectionRoutes, { prefix: "/api/collections" });

server.get("*", function (_req, rep) {
  rep.send({ message: "Not found" });
});

server.setErrorHandler(function (error, request, reply) {
  if (error instanceof ApiError) {
    reply
      .code(error.statusCode)
      .send({ error: error.message, details: error.details });
  } else if (error instanceof ZodError) {
    reply.code(400).send({ error: error.message });
  } else {
    request.log.error(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
});

server.register(cors, { origin: process.env.CORS_ORIGIN || "*" });

const port = Number(process.env.PORT) || 5000;

server.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
