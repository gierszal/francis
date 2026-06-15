import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import { FileServiceError } from "@/errors/index.js";
import type { Multipart, MultipartFile } from "@fastify/multipart";

export enum FileType {
  AUDIO = "audio",
  IMAGE = "image",
}

export class FileService {
  async createFile(type: FileType, file: MultipartFile): Promise<string> {
    try {
      const fileExtension = file.filename.split(".").pop();
      const fileName = uuidv4() + "." + fileExtension;
      const filePath = path.resolve(process.cwd(), "static", type);

      await fs.mkdir(filePath, { recursive: true });

      await fs.writeFile(
        path.resolve(filePath, fileName),
        await file.toBuffer(),
      );
      return type + "/" + fileName;
    } catch (error: any) {
      throw new FileServiceError("Unable to write file!", error.message);
    }
  }

  async removeFile(fileName: string): Promise<string> {
    try {
      const filePath = path.resolve(process.cwd(), "static", fileName);

      await fs.access(filePath);

      await fs.unlink(filePath);

      return `The file with the path of ${filePath} has been deleted succesfully!`;
    } catch (err) {
      throw new FileServiceError("Unable to remove file!");
    }
  }
}
