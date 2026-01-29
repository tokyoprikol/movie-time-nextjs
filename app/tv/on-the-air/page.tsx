import MediaListPage from "@/components/media-list-page";
import {
  getAllTvSeriesGenres,
  getOnTheAirTvSeries,
} from "@/lib/tmdb/tv-series";

export default async function MoviesPopular() {
  const { results: tvSeries, page, total_pages } = await getOnTheAirTvSeries();
  const { genres } = await getAllTvSeriesGenres();

  console.log(tvSeries);
  console.log(genres);
  return (
    <MediaListPage
      title="Currently Airing TV Shows"
      data={tvSeries}
      genres={genres}
    />
  );
}
