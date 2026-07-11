import { trackApi } from "@/api/modules/trackApi";
import { QueueMeta, QueueSource } from "@/types/player";
import { FormattedTrack } from "@/types/track";
import { QueryClient } from "@tanstack/react-query";
import { createStore } from "zustand/vanilla";

export type PlayerState = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLooped: boolean;
  audio: HTMLAudioElement | null;
  queueMeta: QueueMeta;
  queryClient: QueryClient | null;
  activeTrack: FormattedTrack | null;
  currentTracks: FormattedTrack[];
  currentIndex: number;
};

export type PlayerActions = {
  initAudio: () => void;
  setPlay: () => void;
  setPause: () => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleLoop: () => void;
  setQueueMeta: (queueMeta: QueueMeta) => void;
  setQueryClient: (queryClient: QueryClient) => void;
  setActiveTrack: (
    track: FormattedTrack,
    tracksOnPage: FormattedTrack[],
  ) => void;
  loadTrack: (track: FormattedTrack) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  fetchNextChunk: (
    source: QueueSource,
    offset: number,
    count: number,
    queryString: string,
    queryClient: QueryClient,
  ) => Promise<{ items: any[]; total: number }>;
};

export type PlayerStore = PlayerState & PlayerActions;

export const defaultInitState: PlayerState = {
  activeTrack: null,
  currentIndex: 0,
  currentTime: 0,
  currentTracks: [],
  duration: 0,
  isLooped: false,
  isPlaying: false,
  volume: 50,
  audio: null,
  queueMeta: {
    count: 10,
    offset: 0,
    searchQuery: "",
    total: 0,
    source: {
      type: "tracks",
    },
  },
  queryClient: null,
};

export const createPlayerStore = (
  initState: PlayerState = defaultInitState,
) => {
  return createStore<PlayerStore>()((set, get) => ({
    ...initState,
    initAudio: () => {
      if (typeof window === "undefined" || get().audio) return;

      const audio = new Audio();
      audio.addEventListener("timeupdate", () => {
        set({ currentTime: audio.currentTime });
      });
      audio.addEventListener("loadedmetadata", () => {
        set({ duration: audio.duration });
      });

      audio.addEventListener("pause", () => [set({ isPlaying: false })]);

      audio.addEventListener("play", () => [set({ isPlaying: true })]);

      audio.addEventListener("ended", () => {
        const { nextTrack } = get();
        set({ duration: audio.duration });
        nextTrack();
      });
      set({ audio });
    },
    setPlay: () => {
      const { audio } = get();
      if (audio) {
        audio
          .play()
          .then(() => set({ isPlaying: true }))
          .catch(() => {});
      }
    },
    fetchNextChunk: async (source, offset, count, searchQuery, queryClient) => {
      switch (source.type) {
        case "tracks": {
          const res = await queryClient.fetchQuery({
            queryKey: [
              "tracks",
              {
                offset,
                count,
                searchQuery,
              },
            ],
            queryFn: () =>
              trackApi.get({
                count,
                offset,
                searchQuery,
              }),
          });
          return { items: res?.items?.data, total: res?.total };
        }
        case "me/history": {
          const res = await queryClient.fetchQuery({
            queryKey: [
              "me/history",
              {
                offset,
                count,
                searchQuery,
              },
            ],
            queryFn: () =>
              trackApi.get({
                count,
                offset,
                searchQuery,
              }),
          });
          return { items: res?.items?.data, total: res?.total };
        }
        case "me/favourites": {
          const res = await queryClient.fetchQuery({
            queryKey: [
              "me/favourites",
              {
                offset,
                count,
                searchQuery,
              },
            ],
            queryFn: () =>
              trackApi.get({
                count,
                offset,
                searchQuery,
              }),
          });
          return { items: res?.items?.data, total: res?.total };
        }
        case "default": // в это кейс зайти по идее не должны, так как у альбомов/плейлистов разом подгружаем
          return { items: null, total: 0 };
      }
    },
    setPause: () => {
      const { audio } = get();
      if (audio) {
        audio.pause();
        set({ isPlaying: false });
      }
    },
    setVolume: (volume) => {
      const { audio } = get();
      if (audio) {
        audio.volume = volume / 100;
        set({ volume });
      }
    },
    toggleLoop: () => {
      const { audio } = get();
      if (audio) {
        audio.loop = !audio.loop;
        set({ isLooped: audio.loop });
      }
    },
    setQueueMeta: (meta) => {
      set((state) => ({
        queueMeta: state.queueMeta
          ? { ...state.queueMeta, ...meta }
          : (meta as QueueMeta),
      }));
    },
    setQueryClient: (queryClient) => {
      set({
        queryClient,
      });
    },
    setCurrentTime: (time) => {
      const { audio } = get();
      if (audio) {
        audio.currentTime = time;
        set({ currentTime: time });
      }
    },
    loadTrack: async (track) => {
      const { audio, volume } = get();
      if (!audio) return;
      const audioPath = `${process.env.NEXT_PUBLIC_SERVER_STATIC}/${track?.audio}`;
      audio.src = audioPath;
      audio.volume = volume / 100;
      // audio.play().catch(() => {});
      try {
        await audio.play();
        set({ isPlaying: true });
      } catch {
        set({ isPlaying: false });
      }
    },
    setActiveTrack: (track, tracksOnPage) => {
      const { audio, volume, loadTrack } = get();
      if (!audio) return;
      loadTrack(track);
      set({
        activeTrack: track,
        currentTime: 0,
        currentIndex: tracksOnPage.indexOf(track),
        currentTracks: tracksOnPage,
      });
    },
    nextTrack: async () => {
      const {
        isLooped,
        currentIndex,
        currentTracks,
        audio,
        loadTrack,
        queueMeta,
        queryClient,
        fetchNextChunk,
      } = get();
      if (!audio || !queryClient) return;
      if (isLooped) {
        audio.currentTime = 0;
        set({ currentTime: 0 });
        return;
      }
      const offset = queueMeta?.offset ?? 0;
      const total = queueMeta?.total ?? 0;
      const count = queueMeta?.count ?? 0;
      const searchQuery = queueMeta?.searchQuery ?? "";
      const source = queueMeta?.source ?? "";

      const hasMore = offset + (currentTracks?.length ?? 0) < total;

      if (currentIndex === currentTracks?.length - 1)
        if (hasMore) {
          const { items: newItems, total } = await fetchNextChunk(
            source,
            offset + (currentTracks?.length ?? 0),
            count,
            searchQuery,
            queryClient,
          );
          const updatedTracks = [...currentTracks, ...newItems];
          const nextIndex = currentIndex + 1;
          set({
            currentTracks: updatedTracks,
            currentIndex: nextIndex,
            activeTrack: updatedTracks[nextIndex],
            currentTime: 0,
            duration: 0,
          });
          loadTrack(updatedTracks[nextIndex]);
          return;
        } else {
          if (source.type !== "default") {
            const { items: newItems } = await fetchNextChunk(
              source,
              0,
              count,
              searchQuery,
              queryClient,
            );
            set({
              currentTracks: newItems,
              currentIndex: 0,
              activeTrack: newItems[0],
              currentTime: 0,
              duration: 0,
              queueMeta: {
                ...queueMeta,
                offset: 0,
              },
            });
            loadTrack(newItems[0]);
            return;
          } else {
            set({
              currentIndex: 0,
              activeTrack: currentTracks[0],
              currentTime: 0,
              duration: 0,
              queueMeta: {
                ...queueMeta,
                offset: 0,
              },
            });
            loadTrack(currentTracks[0]);
            return;
          }
        }
      else {
        const nextIndex = currentIndex + 1;
        loadTrack(currentTracks[nextIndex]);
        set({
          currentIndex: nextIndex,
          activeTrack: currentTracks[nextIndex],
          currentTime: 0,
          duration: 0,
        });
      }
    },
    prevTrack: async () => {
      const {
        currentIndex,
        currentTracks,
        audio,
        isLooped,
        loadTrack,
        queueMeta,
        queryClient,
        fetchNextChunk,
      } = get();
      if (!audio || !queryClient) return;
      if (isLooped) {
        audio.currentTime = 0;
        set({ currentTime: 0 });
        return;
      }

      const offset = queueMeta?.offset ?? 0;
      const total = queueMeta?.total ?? 0;
      const count = queueMeta?.count ?? 0;
      const searchQuery = queueMeta?.searchQuery ?? "";
      const source = queueMeta?.source;

      const hasMore = offset - count >= 0;

      if (currentIndex === 0) {
        if (hasMore) {
          const { items: newItems } = await fetchNextChunk(
            source,
            offset - count,
            count,
            searchQuery,
            queryClient,
          );
          const updatedTracks = [...newItems, ...currentTracks];
          const prevIndex = offset - 1;
          set({
            currentTracks: updatedTracks,
            currentIndex: prevIndex,
            activeTrack: updatedTracks[prevIndex],
            currentTime: 0,
            duration: 0,
          });
          loadTrack(updatedTracks[prevIndex]);
          return;
        } else {
          audio.currentTime = 0;
          set({ currentTime: 0 });
          return;
        }
      } else {
        const prevIndex = currentIndex - 1;
        loadTrack(currentTracks[prevIndex]);
        set({
          currentIndex: prevIndex,
          activeTrack: currentTracks[prevIndex],
          currentTime: 0,
          duration: 0,
        });
      }
    },
  }));
};
