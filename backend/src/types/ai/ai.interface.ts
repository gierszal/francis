import type { AIGenerateResponse } from "./ai.response.js";

export type IAIService = {
  generate: (prompt: string) => Promise<AIGenerateResponse>;
};
