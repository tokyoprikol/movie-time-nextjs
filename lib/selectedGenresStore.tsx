import { create } from "zustand";
import { Genres } from "./tmdb/tmdbTypes";

interface GenresState {
  selectedGenres: Genres[];
  setSelectedGenres: (genre: Genres) => void;
  isFilterActive: boolean;
  setFilterActive: (active: boolean) => void;
}

export const useGenresStore = create<GenresState>((set) => ({
  selectedGenres: [],
  setSelectedGenres: (genre) =>
    set((state) => {
      const exists = state.selectedGenres.some((g) => g.id === genre.id);
      return {
        selectedGenres: exists
          ? state.selectedGenres.filter((g) => g.id !== genre.id)
          : [...state.selectedGenres, genre],
      };
    }),
  isFilterActive: false,
  setFilterActive: (bool) => set({ isFilterActive: bool }),
}));
