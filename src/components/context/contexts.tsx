import { createContext } from "react";

export type FavoritesContextType = {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  addFavorite: (id: string) => console.warn(`no ${id}`),
  removeFavorite: (id: string) => console.warn(`no ${id}`),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isFavorite: (id: string) => false,
  favoriteIds: [],
});
