import MediaListPage from "@/components/media-list-page";
import { getTopRatedTvSeries } from "@/lib/tmdb/tv-series";

export default async function MoviesPopular() {
  const { results: tvSeries, page, total_pages } = await getTopRatedTvSeries();

  console.log(tvSeries);
  return <MediaListPage title="Top Rated TV Shows" data={tvSeries} />;
}
