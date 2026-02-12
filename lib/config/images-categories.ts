export type ImageCategory = (typeof IMAGE_CATEGORIES)[number]["category"];

export const IMAGE_CATEGORIES = [
  { category: "No Languages", iso_639_1: null },
  { category: "English", iso_639_1: "en" },
  { category: "Japanese", iso_639_1: "ja" },
  { category: "Russian", iso_639_1: "ru" },
] as const;
