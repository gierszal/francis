/*
  Warnings:

  - A unique constraint covering the columns `[album_id,collection_id]` on the table `albums_collections` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[track_id,user_id]` on the table `tracks_listened` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "albums_collections_album_id_collection_id_key" ON "albums_collections"("album_id", "collection_id");

-- CreateIndex
CREATE UNIQUE INDEX "tracks_listened_track_id_user_id_key" ON "tracks_listened"("track_id", "user_id");
