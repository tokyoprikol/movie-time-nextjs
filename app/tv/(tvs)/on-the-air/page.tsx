import InfiniteScroll from "@/components/infinite-scroll";
import { getOnTheAirTvSeries } from "@/lib/tmdb/API/tv-series";

export default async function MoviesPopular() {
  const initialData = await getOnTheAirTvSeries();

  console.log(initialData.results);

  return (
    <InfiniteScroll
      title="Currently Airing TV Shows"
      initialData={initialData}
      mediaType="tv"
      category="on-the-air"
    />
  );
}
