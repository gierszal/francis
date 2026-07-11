import type { AIGenerateResult } from "./ai.response.js";

export type IAIService = {
  generate: (prompt: string) => Promise<AIGenerateResult>;
};
