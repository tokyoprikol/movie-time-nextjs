import MediaListPage from "@/components/media-list-page";
import { getAllMovieGenres, getUpcomingMovies } from "@/lib/tmdb/movies";

export default async function MoviesPopular() {
  const { results: movies, page, total_pages } = await getUpcomingMovies();
  const { genres } = await getAllMovieGenres();

  console.log(movies);
  console.log(genres);
  return (
    <MediaListPage title="Upcoming Movies" data={movies} genres={genres} />
  );
}
