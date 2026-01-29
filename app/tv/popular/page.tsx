import MediaListPage from "@/components/media-list-page";
import { getAllTvSeriesGenres, getPopularTvSeries } from "@/lib/tmdb/tv-series";

export default async function MoviesPopular() {
  const { results: tvSeries, page, total_pages } = await getPopularTvSeries();
  const { genres } = await getAllTvSeriesGenres();

  console.log(tvSeries);
  console.log(genres);
  return (
    <MediaListPage title="Popular TV Shows" data={tvSeries} genres={genres} />
  );
}
