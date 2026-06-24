export const playlistItemSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description: "Unique identifier of the playlist",
    },
    name: { type: "string", description: "Playlist name" },
    description: {
      type: "string",
      nullable: true,
      description: "Optional description",
    },
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
    authorId: {
      type: "string",
      format: "uuid",
      description: "User who created the playlist",
    },
    trackIds: {
      type: "array",
      description:
        "Array of UUIDs of tracks that belong to the playlist (derived from `playlistTracks` relation)",
      items: { type: "string", format: "uuid" },
    },
  },
  required: ["id", "name", "createdAt", "updatedAt", "authorId", "trackIds"],
  additionalProperties: false,
};

export const playlistListSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: { $ref: "#/components/schemas/PlaylistItem" },
    },
    total: {
      type: "integer",
      description: "Total number of playlists (ignoring pagination)",
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
