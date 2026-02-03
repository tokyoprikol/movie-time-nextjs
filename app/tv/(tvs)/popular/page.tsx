import InfiniteScrollTv from "@/components/infinite-scroll-tv";
import MediaListPage from "@/components/media-list-page";
import { getPopularTvSeries } from "@/lib/tmdb/tv-series";

export default async function MoviesPopular() {
  const initialData = await getPopularTvSeries();

  console.log(initialData.results);
  return (
    <InfiniteScrollTv
      title="Popular TV Shows"
      initialData={initialData}
      category="popular"
    />
  );
}
