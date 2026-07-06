// export type QueueMeta = {
//   offset: number;
//   count: number;
//   total: number;
//   searchQuery: string;
// } | null;

export type QueueSource =
  | { type: "tracks" }
  | { type: "me/favourites" }
  | { type: "me/history" }
  | { type: "default" };

export type QueueMeta = {
  source: QueueSource;
  offset: number;
  count: number;
  total: number;
  searchQuery: string;
};
