import type { MultipartFile } from "@fastify/multipart";

export enum FileType {
  AUDIO = "audio",
  IMAGE = "image",
}

export type FileServiceType = {
  createFile(type: FileType, file: MultipartFile): Promise<string>;
  removeFile(fileName: string): Promise<string>;
};
