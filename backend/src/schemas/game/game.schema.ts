import type { MultipartFile } from "@fastify/multipart";
import { z } from "zod";

export const createGameSchema = z.object({
  name: z
    .string()
    .min(1, "The name is not provided!")
    .max(100, "Too long name"),
  picture: z
    .custom<MultipartFile>(
      (file) => {
        return file !== undefined && file !== null;
      },
      {
        message: "Album picture is missing!",
      },
    )
    .refine(
      (file) => {
        const allowedMimeTypes = ["image/jpeg", "image/png"];
        return allowedMimeTypes.includes(file.mimetype);
      },
      {
        message: "File format is not supported!",
      },
    ),
});

export const updateGameSchema = createGameSchema.partial();
