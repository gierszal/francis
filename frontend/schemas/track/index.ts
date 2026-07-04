import z from "zod";
import { emptyResultToUndefined } from "../common";

export const createTrackSchema = z.object({
  name: z
    .string()
    .min(1, "The track name is not provided!")
    .max(100, "Too long track name"),
  artist: z
    .string()
    .min(1, "The artist name is not provided!")
    .max(100, "Too long artist name"),
  audio: z
    .custom<File>(
      (file) => {
        return file !== undefined && file !== null;
      },
      {
        message: "Album picture is missing!",
      },
    )
    .refine(
      (file) => {
        const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/flac"];
        return allowedMimeTypes.includes(file.type);
      },
      {
        message: "File format is not supported!",
      },
    ),
  albumId: z.uuid("Id is not valid!"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export const updateTrackSchema = z.object({
  name: emptyResultToUndefined(
    z
      .string()
      .min(1, "The track name is not provided!")
      .max(100, "Too long track name"),
  ),
  artist: emptyResultToUndefined(
    z
      .string()
      .min(1, "The artist name is not provided!")
      .max(100, "Too long artist name"),
  ),
  audio: emptyResultToUndefined(
    z
      .custom<File>(
        (file) => {
          return file !== undefined && file !== null;
        },
        {
          message: "Audio file is missing!",
        },
      )
      .refine(
        (file) => {
          const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/flac"];
          return allowedMimeTypes.includes(file.type);
        },
        {
          message: "File format is not supported!",
        },
      ),
  ),
  albumId: emptyResultToUndefined(z.uuid("Id is not valid!")),
  tags: emptyResultToUndefined(
    z.array(z.string()).min(1, "At least one tag is required"),
  ),
});
