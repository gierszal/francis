import type { Game } from "@/generated/prisma/client.js";
import type { ListResponse } from "../common/response.js";
import type { FormattedGame } from "./index.js";

export type GamesResponse = ListResponse<FormattedGame>;
