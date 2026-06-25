import type { ListResponse } from "../common/response.js";
import type {
  FormattedCollection,
  FormattedDetailedCollection,
} from "./index.js";

export type CollectionsResponse = ListResponse<FormattedCollection>;
