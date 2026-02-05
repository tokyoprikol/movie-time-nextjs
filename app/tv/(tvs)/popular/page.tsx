import InfiniteScroll from "@/components/infinite-scroll";
import { getPopularTvSeries } from "@/lib/tmdb/API/tv-series";

export default async function MoviesPopular() {
  const initialData = await getPopularTvSeries();

  console.log(initialData.results);
  return (
    <InfiniteScroll
      title="Popular TV Shows"
      initialData={initialData}
      mediaType="tv"
      category="popular"
    />
  );
}
