export const userItemSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description: "User UUID",
    },
    firstName: {
      type: "string",
      maxLength: 100,
      description: "First name",
    },
    lastName: {
      type: "string",
      maxLength: 100,
      nullable: true,
      description: "Last name (optional)",
    },
    email: {
      type: "string",
      format: "email",
      description: "User e‑mail address",
    },
    isActivated: {
      type: "boolean",
      description: "Has the account been activated?",
    },
    roleId: {
      type: "integer",
      description: "Foreign key to the `Role` table",
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
    playlistIds: {
      type: "array",
      description: "IDs of playlists owned by the user",
      items: { type: "string", format: "uuid" },
    },
    favouriteTrackIds: {
      type: "array",
      description: "IDs of tracks the user marked as favourite",
      items: { type: "string", format: "uuid" },
    },
    listenedTrackIds: {
      type: "array",
      description: "IDs of tracks the user has listened to (history)",
      items: { type: "string", format: "uuid" },
    },
  },
  required: [
    "id",
    "firstName",
    "email",
    "isActivated",
    "roleId",
    "createdAt",
    "updatedAt",
    "playlistIds",
    "favouriteTrackIds",
    "listenedTrackIds",
  ],
  additionalProperties: false,
};
