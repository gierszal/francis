import { trackSchema } from "@/schemas/track/track.response.schema.js";
import type {
  IAIService,
  AIGenerateResponse,
  AIGenerateResult,
} from "@/types/ai/index.js";
import type { FormattedTrack, ITrackRepository } from "@/types/track/index.js";
import type { IUserRepository } from "@/types/user/index.js";
import { Ollama } from "ollama";

export class AIService implements IAIService {
  constructor(
    private trackRepository: ITrackRepository,
    private userRepository: IUserRepository,
    private ollama = new Ollama({ host: process.env.OLLAMA_API_URL! }),
  ) {}

  async generate(prompt: string): Promise<AIGenerateResult> {
    try {
      const response = await this.ollama.chat({
        model: process.env.ollamaModel!,
        messages: [{ role: "user", content: prompt }],
      });

      return {
        fulfilled: true,
        response: response.message.content,
      };
    } catch (e) {
      throw e;
    }
  }
}
