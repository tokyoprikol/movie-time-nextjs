import InfiniteScroll from "@/components/infinite-scroll";
import { getTopRatedTvSeries } from "@/lib/tmdb/API/tv-series";

export default async function MoviesPopular() {
  const initialData = await getTopRatedTvSeries();

  console.log(initialData.results);
  return (
    <InfiniteScroll
      title="Top Rated TV Shows"
      initialData={initialData}
      mediaType="tv"
      category="top-rated"
    />
  );
}
