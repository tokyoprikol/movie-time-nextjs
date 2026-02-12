import { getMultiSearchResponse } from "@/lib/tmdb/API/search";
import SearchedMediaList from "@/components/searched-media-list";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  if (!query) return "No search query";

  const initialData = await getMultiSearchResponse(1, query);
  console.log(initialData);

  return <SearchedMediaList query={query} initialData={initialData} />;
}
