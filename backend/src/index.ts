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
import userRoutes from "./modules/user/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import gameRoutes from "./modules/game/game.routes.js";
import { fastifyCookie } from "@fastify/cookie";
import { errorHandler } from "./errors/errorHandler.js";
import aiRoutes from "./modules/ai/ai.routes.js";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = fastify({ logger: { level: "info" } });

server.register(fastifyMultipart, {
  attachFieldsToBody: true,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

server.register(fastifyStatic, {
  root: join(__dirname, "../static"),
  prefix: "/static",
});

server.register(trackRoutes, { prefix: "/api/v1/tracks" });
server.register(albumRoutes, { prefix: "/api/v1/albums" });
server.register(playlistRoutes, { prefix: "/api/v1/playlists" });
server.register(collectionRoutes, { prefix: "/api/v1/collections" });
server.register(userRoutes, { prefix: "/api/v1/users" });
server.register(gameRoutes, { prefix: "/api/v1/games" });
server.register(authRoutes, { prefix: "/api/v1/auth" });
server.register(aiRoutes, { prefix: "/api/v1/ai" });
server.register(fastifyCookie, {
  secret: process.env.COOKIE_KEY!,
});

server.setErrorHandler(errorHandler);

server.get("*", function (_req, rep) {
  rep.send({ message: "Not found" });
});

server.register(cors, { origin: process.env.CORS_ORIGIN || "*" });

const port = Number(process.env.PORT) || 10000;

server.listen({ port: port, host: process.env.HOST! }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
