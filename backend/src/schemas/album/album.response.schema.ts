import z from "zod";

export const albumItemSchema = z.object({
  id: z.uuid(),

  name: z.string().max(100),

  picture: z.url().nullable(),

  description: z.string().max(255).nullable(),

  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),

  gameId: z.uuid(),

  trackIds: z.array(z.uuid()),

  collectionIds: z.array(z.uuid()),
});

export const albumListSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: albumItemSchema,
    },
    total: { type: "integer", minimum: 0 },
    page: { type: "integer", minimum: 1 },
    limit: { type: "integer", minimum: 1 },
  },
  required: ["data", "total", "page", "limit"],
};
