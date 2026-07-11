import type { Collection } from "@/generated/prisma/client.js";
import type {
  FormattedCollection,
  FormattedDetailedCollection,
} from "@/types/collection/collection.model.js";
import type { CollectionWithAlbums } from "@/types/collection/collection.result.js";
import { formatAlbum } from "./album.formatter.js";

export function formatCollection(collection: Collection): FormattedCollection {
  return {
    id: collection.id,
    name: collection.name,
    created_at: collection.createdAt,
    updated_at: collection.updatedAt,
  };
}

export function formatDetailedCollection(
  collection: Collection | any,
): FormattedDetailedCollection {
  return {
    id: collection.id,
    name: collection.name,
    albums_amount: collection._count.albumCollections,
    albums: collection.albumCollections.map((albumArray: any) =>
      formatAlbum(albumArray.album),
    ),
    created_at: collection.createdAt,
    updated_at: collection.updatedAt,
  };
}
