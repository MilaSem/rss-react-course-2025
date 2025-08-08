import { create } from 'zustand';
import type { Media } from '@/types/anilistTypes';

interface CacheState {
  cache: Record<number, Media>;
  addItems: (items: Media[]) => void;
  getItemById: (id: number) => Media | undefined;
}

export const useAnimeCache = create<CacheState>((set, get) => ({
  cache: {},
  addItems: (items) => {
    set((state) => {
      const newCache = { ...state.cache };
      items.forEach((item) => {
        if (item.id !== undefined) {
          newCache[item.id] = item;
        }
      });
      return { cache: newCache };
    });
  },
  getItemById: (id) => get().cache[id],
}));
