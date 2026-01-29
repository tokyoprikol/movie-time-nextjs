import { getAllMovieGenres, getTopRatedMovies } from "@/lib/tmdb/movies";

import MediaListPage from "@/components/media-list-page";

export default async function MoviesPopular() {
  const { results: movies, page, total_pages } = await getTopRatedMovies();
  const { genres } = await getAllMovieGenres();

  console.log(movies);
  console.log(genres);
  return (
    <MediaListPage title="Top Rated Movies" data={movies} genres={genres} />
  );
}
