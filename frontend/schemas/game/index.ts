import z from "zod";
import { emptyResultToUndefined } from "../common";

export const createGameSchema = z.object({
  name: z
    .string()
    .min(1, "The name is not provided!")
    .max(100, "Too long name"),
  picture: z
    .custom<File>(
      (file) => {
        return file !== undefined && file !== null;
      },
      {
        message: "Game picture is missing!",
      },
    )
    .refine(
      (file) => {
        const allowedMimeTypes = ["image/jpeg", "image/png"];
        return allowedMimeTypes.includes(file.type);
      },
      {
        message: "File format is not supported!",
      },
    ),
});

export const updateGameSchema = z.object({
  name: emptyResultToUndefined(
    z.string().min(1, "The name is not provided!").max(100, "Too long name"),
  ),
  picture: emptyResultToUndefined(
    z
      .custom<File>(
        (file) => {
          return file !== undefined && file !== null;
        },
        {
          message: "Game picture is missing!",
        },
      )
      .refine(
        (file) => {
          const allowedMimeTypes = ["image/jpeg", "image/png"];
          return allowedMimeTypes.includes(file.type);
        },
        {
          message: "File format is not supported!",
        },
      ),
  ),
});
