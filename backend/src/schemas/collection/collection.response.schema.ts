export const collectionItemSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description: "Unique identifier of the collection",
    },
    name: { type: "string", description: "Collection name" },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "Creation timestamp",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      description: "Last‑update timestamp",
    },
    albumCollectionIds: {
      type: "array",
      description:
        "Array of UUIDs from the AlbumCollection table that belong to this collection",
      items: { type: "string", format: "uuid" },
    },
  },
  required: ["id", "name", "createdAt", "updatedAt", "albumCollectionIds"],
  additionalProperties: false,
};

export const collectionListSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: { $ref: "#/components/schemas/CollectionItem" },
    },
    total: {
      type: "integer",
      description: "Total number of records (ignoring pagination)",
    },
    page: {
      type: "integer",
      description: "Current page (1‑based indexing)",
    },
    limit: {
      type: "integer",
      description: "Number of items per page",
    },
  },
  required: ["data", "total", "page", "limit"],
  additionalProperties: false,
};

export const emptyResponseSchema = { type: "null" };
