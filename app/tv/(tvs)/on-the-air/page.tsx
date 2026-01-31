import MediaListPage from "@/components/media-list-page";
import { getOnTheAirTvSeries } from "@/lib/tmdb/tv-series";

export default async function MoviesPopular() {
  const { results: tvSeries, page, total_pages } = await getOnTheAirTvSeries();

  console.log(tvSeries);
  return <MediaListPage title="Currently Airing TV Shows" data={tvSeries} />;
}
