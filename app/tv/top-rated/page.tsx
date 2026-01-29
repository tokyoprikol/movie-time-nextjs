import MediaListPage from "@/components/media-list-page";
import {
  getAllTvSeriesGenres,
  getTopRatedTvSeries,
} from "@/lib/tmdb/tv-series";

export default async function MoviesPopular() {
  const { results: tvSeries, page, total_pages } = await getTopRatedTvSeries();
  const { genres } = await getAllTvSeriesGenres();

  console.log(tvSeries);
  console.log(genres);
  return (
    <MediaListPage title="Top Rated TV Shows" data={tvSeries} genres={genres} />
  );
}
