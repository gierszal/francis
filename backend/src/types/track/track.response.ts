import type { ListResponse } from "@/types/common/response.js";
import type { FormattedTrack } from "./track.model.js";

export type TracksResponse = ListResponse<FormattedTrack>;
