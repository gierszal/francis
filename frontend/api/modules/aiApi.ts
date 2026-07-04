import { GetItemsParams } from "@/types/api/common";
import $api from "..";
import { AIGenerateSchema } from "@/types/ai";

export const aiApi = {
  generate: async (data: AIGenerateSchema) => {
    const prompt = process.env.NEXT_PUBLIC_PROMPT_SAMPLE + JSON.stringify(data);
    const res = await $api.post("/ai/generate", { prompt });
    const result = res.data;
    return result;
  },
};
