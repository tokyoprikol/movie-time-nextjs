import InfiniteScroll from "@/components/infinite-scroll";
import { getAiringTodayTvSeries } from "@/lib/tmdb/API/tv-series";

export default async function MoviesPopular() {
  const initialData = await getAiringTodayTvSeries();

  console.log(initialData.results);

  return (
    <InfiniteScroll
      title="TV Shows Airing Today"
      initialData={initialData}
      mediaType="tv"
      category="airing-today"
    />
  );
}
