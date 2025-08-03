import { create } from 'zustand';

interface SelectedItemsState {
  selectedIds: number[];
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
}

export const useSelectedItems = create<SelectedItemsState>((set) => ({
  selectedIds: [],
  addItem: (id) =>
    set((state) => ({ selectedIds: [...state.selectedIds, id] })),
  removeItem: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.filter((itemId) => itemId !== id),
    })),
}));
