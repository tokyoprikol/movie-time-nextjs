export type ImageCategory = (typeof IMAGE_CATEGORIES)[number]["category"];

export const IMAGE_CATEGORIES = [
  { category: "No Languages", iso_639_1: null },
  { category: "English", iso_639_1: "en" },
  { category: "Japanese", iso_639_1: "ja" },
  { category: "Russian", iso_639_1: "ru" },
] as const;

export type SearchCategory = (typeof SEARCH_CATEGORIES)[number]["category"];

export const SEARCH_CATEGORIES = [
  { category: "movie", category_name: "Movies" },
  { category: "tv", category_name: "TV Shows" },
  { category: "person", category_name: "People" },
] as const;
