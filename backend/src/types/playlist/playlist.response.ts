import type { ListResponse } from "../common/response.js";
import type {
  FormattedDetailedPlaylist,
  FormattedPlaylist,
} from "./playlist.model.js";

export type PlaylistsResponse = ListResponse<FormattedPlaylist>;
