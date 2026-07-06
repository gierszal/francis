"use client";

import { type ReactNode, createContext, useState, useContext } from "react";
import { useStore } from "zustand";

import { type PlayerStore, createPlayerStore } from "@/store/playerStore";

export type PlayerStoreApi = ReturnType<typeof createPlayerStore>;

export const PlayerStoreContext = createContext<PlayerStoreApi | undefined>(
  undefined,
);

export interface PlayerStoreProviderProps {
  children: ReactNode;
}

export const PlayerStoreProvider = ({ children }: PlayerStoreProviderProps) => {
  const [store] = useState(() => createPlayerStore());
  return (
    <PlayerStoreContext.Provider value={store}>
      {children}
    </PlayerStoreContext.Provider>
  );
};

export const usePlayerStore = <T,>(selector: (store: PlayerStore) => T): T => {
  const playerStoreContext = useContext(PlayerStoreContext);
  if (!playerStoreContext) {
    throw new Error(`usePlayerStore must be used within PlayerStoreProvider`);
  }

  return useStore(playerStoreContext, selector);
};
