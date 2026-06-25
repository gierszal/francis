/*
  Warnings:

  - A unique constraint covering the columns `[user_id,track_id]` on the table `favourites` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[track_id,playlist_id]` on the table `playlists_tracks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favourites_user_id_track_id_key" ON "favourites"("user_id", "track_id");

-- CreateIndex
CREATE UNIQUE INDEX "playlists_tracks_track_id_playlist_id_key" ON "playlists_tracks"("track_id", "playlist_id");
