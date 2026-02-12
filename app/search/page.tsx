import { getMultiSearchResponse } from "@/lib/tmdb/API/search";
import SearchedMediaList from "@/components/searched-media-list";

type SearchCategory = (typeof SEARCH_CATEGORIES)[number]["category"];

const SEARCH_CATEGORIES = [
  { category: "movie", category_name: "Movies" },
  { category: "tv", category_name: "TV Shows" },
  { category: "person", category_name: "People" },
] as const;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  if (!query) return "No search query";

  const data = await getMultiSearchResponse(query);
  console.log(data);

  const categoryCounts = SEARCH_CATEGORIES.reduce(
    (acc, { category }) => {
      acc[category] = 0;
      return acc;
    },
    {} as Record<SearchCategory, number>,
  );

  if (data.results) {
    SEARCH_CATEGORIES.forEach(({ category }) => {
      categoryCounts[category] = data.results.filter(
        (item) => item.media_type === category,
      ).length;
    });
  }

  const categoriesWithCounts = SEARCH_CATEGORIES.map((c) => ({
    ...c,
    quantity: categoryCounts[c.category] ?? 0,
  }));

  return (
    <SearchedMediaList
      categoriesWithCounts={categoriesWithCounts}
      data={data}
    />
  );
}
