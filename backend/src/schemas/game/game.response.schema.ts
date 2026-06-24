export const gameItemSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description: "Unique identifier of the game",
    },
    name: { type: "string", description: "Game name" },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "Record creation timestamp",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      description: "Record last‑update timestamp",
    },
    albumIds: {
      type: "array",
      description:
        "Array of UUIDs of albums that belong to this game (derived from the `albums` relation)",
      items: { type: "string", format: "uuid" },
    },
  },
  required: ["id", "name", "createdAt", "updatedAt", "albumIds"],
  additionalProperties: false,
};

export const gameListSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: { $ref: "#/components/schemas/GameItem" },
    },
    total: {
      type: "integer",
      description: "Total number of records (ignoring pagination)",
    },
    page: {
      type: "integer",
      description: "Current page (1‑based)",
    },
    limit: {
      type: "integer",
      description: "Number of items per page",
    },
  },
  required: ["data", "total", "page", "limit"],
  additionalProperties: false,
};
