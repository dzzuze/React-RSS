import { create } from 'zustand';

type SelectedStore = {
  selectedIds: Set<string>;
  toggle: (id: string) => void;
  clear: () => void;
};

export const useSelectedStore = create<SelectedStore>((set) => ({
  selectedIds: new Set(),
  toggle: (id) =>
    set((state) => {
      const newSet = new Set(state.selectedIds);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return { selectedIds: newSet };
    }),
  clear: () => set({ selectedIds: new Set() }),
}));
