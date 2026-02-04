import InfiniteScrollTv from "@/components/infinite-scroll-tv";
import { getTopRatedTvSeries } from "@/lib/tmdb/API/tv-series";

export default async function MoviesPopular() {
  const initialData = await getTopRatedTvSeries();

  console.log(initialData.results);
  return (
    <InfiniteScrollTv
      title="Top Rated TV Shows"
      initialData={initialData}
      category="top-rated"
    />
  );
}
