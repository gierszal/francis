import type { ListResponse } from "@/types/common/response.js";
import type { FormattedAlbum } from "./album.model.js";

export type AlbumsResponse = ListResponse<FormattedAlbum>;
