import InfiniteScrollTv from "@/components/infinite-scroll-tv";
import MediaListPage from "@/components/media-list-page";
import { getTopRatedTvSeries } from "@/lib/tmdb/tv-series";

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
