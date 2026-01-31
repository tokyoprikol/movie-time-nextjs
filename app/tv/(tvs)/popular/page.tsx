import MediaListPage from "@/components/media-list-page";
import { getPopularTvSeries } from "@/lib/tmdb/tv-series";

export default async function MoviesPopular() {
  const { results: tvSeries, page, total_pages } = await getPopularTvSeries();

  console.log(tvSeries);
  return <MediaListPage title="Popular TV Shows" data={tvSeries} />;
}
