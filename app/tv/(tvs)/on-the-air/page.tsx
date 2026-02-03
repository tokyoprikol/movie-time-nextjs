import InfiniteScrollTv from "@/components/infinite-scroll-tv";
import MediaListPage from "@/components/media-list-page";
import { getOnTheAirTvSeries } from "@/lib/tmdb/tv-series";

export default async function MoviesPopular() {
  const initialData = await getOnTheAirTvSeries();

  console.log(initialData.results);

  return (
    <InfiniteScrollTv
      title="Currently Airing TV Shows"
      initialData={initialData}
      category="on-the-air"
    />
  );
  // return <MediaListPage title="Currently Airing TV Shows" data={tvSeries} />;
}
