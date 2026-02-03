import InfiniteScroll from "@/components/infinite-scroll";
import MediaListPage from "@/components/media-list-page";
import { getOnTheAirTvSeries } from "@/lib/tmdb/tv-series";

export default async function MoviesPopular() {
  const initialData = await getOnTheAirTvSeries();

  console.log(tvSeries);

  return (
    <InfiniteScroll
      title="Currently Airing TV Shows"
      initialData={initialData}
    />
  );
  // return <MediaListPage title="Currently Airing TV Shows" data={tvSeries} />;
}
