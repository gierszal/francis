import fastify from "fastify";
import "dotenv/config";
import fastifyMultipart from "@fastify/multipart";
import trackRoutes from "./modules/track/track.routes.js";
import cors from "@fastify/cors";
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
import swaggerPlugin from "./plugins/swagger.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = fastify({
  logger: { level: "info" },
});

await server.register(swaggerPlugin, {
  prefix: `/api/${process.env.API_VERSION}`,
});

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

server.register(trackRoutes, {
  prefix: `/api/${process.env.API_VERSION}/tracks`,
});
server.register(albumRoutes, {
  prefix: `/api/${process.env.API_VERSION}/albums`,
});
server.register(playlistRoutes, {
  prefix: `/api/${process.env.API_VERSION}/playlists`,
});
server.register(collectionRoutes, {
  prefix: `/api/${process.env.API_VERSION}/collections`,
});
server.register(userRoutes, {
  prefix: `/api/${process.env.API_VERSION}/users`,
});
server.register(gameRoutes, {
  prefix: `/api/${process.env.API_VERSION}/games`,
});
server.register(authRoutes, { prefix: `/api/${process.env.API_VERSION}/auth` });
server.register(aiRoutes, { prefix: `/api/${process.env.API_VERSION}/ai` });

server.register(fastifyCookie, {
  secret: process.env.COOKIE_KEY!,
});

server.setErrorHandler(errorHandler);

server.get("*", function (_req, rep) {
  rep.send({ message: "Not found" });
});

server.register(cors, {
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["x-total-count"],
  credentials: true,
  optionsSuccessStatus: 204,
});

const port = Number(process.env.PORT) || 10000;

await server.ready();

server.listen({ port: port, host: process.env.HOST! }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
