import { getPopularMovies } from "@/lib/tmdb/movies";

import MediaListPage from "@/components/media-list-page";

export default async function MoviesPopular() {
  const { results: movies, page, total_pages } = await getPopularMovies();

  console.log(movies);

  return <MediaListPage title="Popular Movies" data={movies} />;
}
