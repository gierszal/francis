import type { AIServiceType } from "@/types/ai/ai.js";
import type { TrackRepositoryType } from "@/types/track/track.js";
import type { UserRepositoryType } from "@/types/user/user.js";
import { Ollama } from "ollama";

export class AIService implements AIServiceType {
  constructor(
    private trackRepository: TrackRepositoryType,
    private userRepository: UserRepositoryType,
    private ollama = new Ollama({ host: process.env.OLLAMA_API_URL! }),
  ) {}

  async generate(prompt: string) {
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
      console.log(e);
      throw e;
    }
  }

  async getRecommendations() {}
}
